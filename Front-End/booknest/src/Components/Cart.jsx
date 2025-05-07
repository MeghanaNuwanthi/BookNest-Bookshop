import React, { useState, useEffect } from 'react';
import { FaTrash, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { useCart } from '../Components/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeFromCart, setCartItems } = useCart(); // assuming setCartItems exists
  const [agreed, setAgreed] = useState(false);
  const DELIVERY_FEE = 2.0;

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCost = cartTotal + DELIVERY_FEE;

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return;
  
      try {
        const res = await fetch(`http://localhost:5000/api/cart/${user._id}`);
        const data = await res.json();
  
        if (data.items && data.items.length > 0) {
          setCartItems(data.items); // this needs to exist in CartContext
        }
      } catch (err) {
        console.error('Failed to load cart:', err);
      }
    };
  
    fetchCart();
  }, []);
  

  const handleCheckout = async () => {
    if (!agreed) {
      alert('You must agree to the terms and conditions');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      alert('You must login before checkout!');
      return;
    }

    if (cartTotal === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Save cart to backend
    try {
      await fetch('http://localhost:5000/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, items: cartItems }),
      });
    } catch (err) {
      console.error('Failed to save cart:', err);
      alert('Error saving cart to server.');
      return;
    }

    // Build invoice string
    const date = new Date().toLocaleString();
    let invoice = `BookNest Invoice\nDate: ${date}\n\n`;
    invoice += `Customer: ${user.username || 'Guest'}\n\nItems:\n`;

    cartItems.forEach((item, index) => {
      invoice += `${index + 1}. ${item.title} - $${item.price} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
    });

    invoice += `\nCart Total: $${cartTotal.toFixed(2)}\n`;
    invoice += `Delivery Fee: $${DELIVERY_FEE.toFixed(2)}\n`;
    invoice += `Total Cost: $${totalCost.toFixed(2)}\n\n`;
    invoice += `Thank you for shopping at BookNest!`;

    // Create downloadable invoice file
    const blob = new Blob([invoice], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `BookNest_Invoice_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#F5F1EB] min-h-screen p-6">
      <div className="flex-1 pr-6">
        <h1 className="text-2xl font-bold mb-6 text-[#6B4226]">BookNest Cart</h1>
        <table className="w-full text-left text-[#6B4226]">
          <thead>
            <tr className="font-semibold text-[#6B4226]">
              <th className="py-2">Product Title</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b border-[#C9B79C]">
                <td className="py-4">{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <div className="flex items-center gap-2 sm:gap-1">
                    <button
                      onClick={() =>
                        item.qty < 5 ? updateQty(item.id, item.qty + 1) : null
                      }
                      className="text-[#6B4226] p-1 hover:text-[#A4452C]"
                    >
                      <FaAngleUp />
                    </button>
                    <span className="px-2">{item.qty}</span>
                    <button
                      onClick={() =>
                        item.qty > 1 ? updateQty(item.id, item.qty - 1) : null
                      }
                      className="text-[#6B4226] p-1 hover:text-[#A4452C]"
                    >
                      <FaAngleDown />
                    </button>
                  </div>
                </td>
                <td>${(item.price * item.qty).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item.id)} className="text-[#6B4226]">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full md:w-1/3 bg-[#D5C1A6] p-6 mt-8 md:mt-0 rounded">
        <h2 className="text-xl font-bold mb-4 text-[#2D1B0C]">Total Bill</h2>
        <div className="flex justify-between mb-2">
          <span>Cart Total :</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Fee :</span>
          <span>${DELIVERY_FEE.toFixed(2)}</span>
        </div>
        <hr className="my-2 border-[#6B4226]" />
        <div className="flex justify-between font-semibold mb-4">
          <span>Total Cost :</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>

        <div className="flex items-center mb-4 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mr-2 accent-[#6B4226]"
          />
          <span>
            I agreed to all{' '}
            <span className="text-[#6B4226] underline cursor-pointer">
              terms & Conditions
            </span>
          </span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-[#A4452C] text-white py-2 rounded hover:bg-[#8c3823] transition duration-200"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
