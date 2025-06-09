'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty</p>
          <Link href="/" className="text-primary hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-6 items-center p-4 border rounded-lg">
                {/* Verifikojmë që item.cover është i disponueshëm dhe të jetë një URL e vlefshme */}
                <img
                  src={

                    item.cover && (item.cover.startsWith('http') || item.cover.startsWith('/images'))
                      ? item.cover
                      : `/images/${item.cover || 'default-cover.jpg'}` // Përdorim një foto default nëse nuk ka cover
                    item.cover && (item.cover.startsWith('http') || item.cover.startsWith('/uploads'))
                      ? item.cover
                      : `/uploads/${item.cover || 'default-cover.jpg'}` // Përdorim një foto default nëse nuk ka cover
                  }
                  alt={item.title || 'Book cover'}
                  className="w-20 h-28 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.title || 'Untitled Book'}</h3>
                  <p className="text-muted-foreground">{item.author || 'Unknown Author'}</p>
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 px-3 py-2 border rounded"
                  />
                  <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="w-full">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
