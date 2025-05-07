const express = require('express');
const router = express.Router();
const { searchBooks, saveBooksToDB} = require('../controllers/bookController');

router.get('/search', searchBooks);
router.get('/save', saveBooksToDB);

module.exports = router;
