const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Make sure the path is correct

// GET cart by userId
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load cart' });
  }
});

// POST to save/update cart
router.post('/save', async (req, res) => {
  const { userId, items } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({ userId, items });
      await cart.save();
    }
    res.status(200).json({ message: 'Cart saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save cart' });
  }
});

module.exports = router;
