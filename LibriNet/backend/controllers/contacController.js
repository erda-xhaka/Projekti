const Contact = require('../models/Contact');

// Create a new contact message
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    // Create new contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact
    });
  } catch (err) {
    console.error('Error creating contact message:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: err.message
    });
  }
};

// Get all contact messages
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages',
      error: err.message
    });
  }
};

// Get contact message by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (err) {
    console.error(`Error fetching contact message ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve message',
      error: err.message
    });
  }
};

// Update contact message status
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['new', 'read', 'responded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid status'
      });
    }
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    contact.status = status;
    await contact.save();
    
    res.status(200).json({
      success: true,
      message: 'Message status updated successfully',
      data: contact
    });
  } catch (err) {
    console.error(`Error updating contact message status ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      message: 'Failed to update message status',
      error: err.message
    });
  }
};

// Delete contact message
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (err) {
    console.error(`Error deleting contact message ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete message',
      error: err.message
    });
  }
};