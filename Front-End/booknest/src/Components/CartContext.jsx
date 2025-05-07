import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  // Load cart from database on mount
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/api/cart/${user._id}`);
          if (response.data && response.data.items) {
            setCartItems(response.data.items);
          }
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      }
    };

    fetchCart();
  }, [user]);

  // Save cart to database whenever it changes, including empty carts
  useEffect(() => {
    const saveCart = async () => {
      if (user) {
        try {
          await axios.post('http://localhost:5000/api/cart/save', {
            userId: user._id,
            items: cartItems, // even empty array will be saved
          });
        } catch (error) {
          console.error('Failed to save cart:', error);
        }
      }
    };

    saveCart();
  }, [cartItems, user]);

  // Add to cart
const addToCart = (book) => {
  const existing = cartItems.find((item) => item.id === book.id);
  if (existing) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === book.id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  } else {
    const title = book.volumeInfo?.title || 'Untitled';
    const price =
      book.price ??
      book.saleInfo?.listPrice?.amount ??
      Math.floor(Math.random() * 20) + 10; // fallback if nothing is provided
    setCartItems((prev) => [...prev, { id: book.id, title, price, qty: 1 }]);
  }
};


  // Update quantity
  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQty, removeFromCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
