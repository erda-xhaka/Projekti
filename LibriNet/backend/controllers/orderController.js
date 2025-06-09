const Order = require('../models/Order');
const Book = require('../models/Book');
const mongoose = require('mongoose');

// Create a new order
exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount, notes, paymentMethod } = req.body;
    
    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    // Check if items array is not empty
    if (!items.length) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }
    
    // Verify all books exist and have sufficient stock
    for (const item of items) {
      const book = await Book.findById(item.book).session(session);
      
      if (!book) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(404).json({
          success: false,
          message: `Book with ID ${item.book} not found`
        });
      }
      
      if (book.stock < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for book "${book.title}". Available: ${book.stock}, Requested: ${item.quantity}`
        });
      }
      
      // Add title to item
      item.title = book.title;
      item.price = book.price;
      
      // Update stock
      book.stock -= item.quantity;
      await book.save({ session });
    }
    
    // Create new order
    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      totalAmount,
      notes,
      paymentMethod: paymentMethod || 'cash_on_delivery'
    });
    
    await order.save({ session });
    
    // Commit transaction
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (err) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    
    console.error('Error creating order:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: err.message
    });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.book');
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
      error: err.message
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.book');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    console.error(`Error fetching order ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order',
      error: err.message
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid status'
      });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // If cancelling an order that was not cancelled before, restore stock
    if (status === 'cancelled' && order.status !== 'cancelled') {
      const session = await mongoose.startSession();
      session.startTransaction();
      
      try {
        // Restore stock for each item
        for (const item of order.items) {
          await Book.findByIdAndUpdate(
            item.book,
            { $inc: { stock: item.quantity } },
            { session }
          );
        }
        
        order.status = status;
        await order.save({ session });
        
        await session.commitTransaction();
        session.endSession();
      } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
      }
    } else {
      order.status = status;
      await order.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (err) {
    console.error(`Error updating order status ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: err.message
    });
  }
};