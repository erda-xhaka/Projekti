'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { CheckCircle, Truck } from 'lucide-react';

export default function ShippingForm() {
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    country: '',
  });

  const [deliveryCost, setDeliveryCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const calculatedTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(calculatedTotal);
    setDeliveryCost(calculatedTotal >= 25 ? 0 : 3);
  }, [cartItems]);

  const isFormValid = () => {
    const { firstName, lastName, phone, address, country } = formData;
    return firstName && lastName && phone && address && country;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert('Ju lutem plotësoni të gjitha fushat.');
      return;
    }

    setIsAnimating(true);
    
    setTimeout(() => {
      setOrderCompleted(true);
      clearCart();
      setIsAnimating(false);
      
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          address: '',
          country: '',
        });
      }, 5000);
    }, 1500);
  };

  if (orderCompleted) {
    return (
      <div className="max-w-3xl mx-auto p-8 rounded-2xl shadow-lg bg-white dark:bg-black text-center">
        {/* Animated Checkmark */}
        <div className="relative mb-6">
          <svg 
            className="w-24 h-24 mx-auto text-green-500 animate-checkmark"
            viewBox="0 0 52 52" 
          >
            <circle 
              className="stroke-green-500" 
              cx="26" 
              cy="26" 
              r="25" 
              fill="none"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset="100"
              style={{
                animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards'
              }}
            />
            <path 
              className="stroke-green-500"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset="100"
              style={{
                animation: 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards'
              }}
            />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-green-600 mb-4 animate-fadeIn">Porosia u krye me sukses!</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate-fadeIn">
          Faleminderit për blerjen. Porosia juaj do të dërgohet në adresën e specifikuar brenda 2-3 ditëve pune.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl mb-8 text-left animate-fadeIn">
          <div className="flex items-center gap-4 mb-4">
            <Truck className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Gjendja e porosisë</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Numri i porosisë:</span>
              <span className="font-medium">#{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Data e dërgesës:</span>
              <span className="font-medium">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setOrderCompleted(false)}
          className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition animate-fadeIn"
        >
          Kthehu në faqen kryesore
        </button>

        <style jsx>{`
          @keyframes stroke {
            100% {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-checkmark circle,
          .animate-checkmark path {
            animation-fill-mode: forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
            animation-delay: 0.3s;
            opacity: 0;
          }
        `}</style>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-8 rounded-2xl shadow-lg bg-white dark:bg-black transition-colors duration-300">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100">Detajet e Dërgesës me Cash on Delivery</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Emri</label>
          <input
            type="text"
            placeholder="Shkruani emrin"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Mbiemri</label>
          <input
            type="text"
            placeholder="Shkruani mbiemrin"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Shteti</label>
          <select
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          >
            <option value="">Zgjidhni shtetin</option>
            <option value="Kosovë">Kosovë</option>
            <option value="Shqipëri">Shqipëri</option>
            <option value="Maqedoni">Maqedoni</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Numri i telefonit</label>
          <input
            type="tel"
            placeholder="04x xxx xxx"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Adresa</label>
          <input
            type="text"
            placeholder="Shkruani adresën tuaj"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl mb-8">
        <div className="flex justify-between mb-2 text-gray-800 dark:text-gray-200">
          <span>Çmimi total i produkteve:</span>
          <span>{total.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between mb-2 text-gray-800 dark:text-gray-200">
          <span>Kosto e dërgesës:</span>
          <span className={deliveryCost === 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
            {deliveryCost === 0 ? 'Falas' : `+${deliveryCost}€`}
          </span>
        </div>
        <hr className="my-3 border-gray-300 dark:border-gray-700" />
        <div className="flex justify-between font-semibold text-lg text-gray-900 dark:text-gray-100">
          <span>Totali për pagim:</span>
          <span>{(total + deliveryCost).toFixed(2)}€</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid() || isAnimating}
        className={`w-full py-4 rounded-xl text-white font-bold text-lg transition relative overflow-hidden
          ${isFormValid() && !isAnimating 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-gray-400 cursor-not-allowed'
          }`}
      >
        {isAnimating ? (
          <>
            <div className="absolute inset-0 bg-green-600"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Po përpunohet...
            </span>
          </>
        ) : (
          'Përfundo Porosinë (Cash on Delivery)'
        )}
      </button>
    </div>
  );
}
=======
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully!');
    clearCart();
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-700">Contact Information</h2>
          <div className="space-y-5">
            <Input
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Shipping Address"
              required
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              required
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div className="space-y-8">
          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h2>
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-2 text-gray-600">
                  <span>{item.title} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-4 flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Method</h2>
            <div className="space-y-4 text-gray-600">
              <RadioOption id="card" name="payment" label="Credit/Debit Card" defaultChecked />
              <RadioOption id="paypal" name="payment" label="PayPal" />
              <RadioOption id="cod" name="payment" label="Cash on Delivery" />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full text-lg py-6 rounded-xl" size="lg">
            Confirm Order
          </Button>
        </div>
      </form>
    </div>
  );
}

function Input({ type, placeholder, required, onChange }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  );
}

function RadioOption({ id, name, label, defaultChecked = false }: any) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        className="accent-blue-600"
      />
      <span>{label}</span>
    </label>
  );
}
>>>>>>> 6270e43a (added new file)
