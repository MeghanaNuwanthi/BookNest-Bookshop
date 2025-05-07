// controllers/cartController.js
const Cart = require('../models/Cart');

// Save or update cart items
const saveCart = async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items) {
    return res.status(400).json({ message: 'userId and items are required' });
  }

  try {
    // Check if cart already exists
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Update existing cart
      cart.items = items;
      await cart.save();
    } else {
      // Create new cart
      cart = new Cart({ userId, items });
      await cart.save();
    }

    res.status(200).json({ message: 'Cart saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving cart', error });
  }
};

// Get cart items for a user
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ items: [] }); // return empty if no cart
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart', error });
  }
};

module.exports = {
  saveCart,
  getCart,
};
