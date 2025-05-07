const axios = require('axios');
const Book = require('../models/Book');

// Define your Google Books API URL
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

const searchBooks = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    console.log(`Fetching books for query: ${query}`);
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: query,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    console.log('Google Books API response:', response.data);
    const books = response.data.items || [];
    await saveBooksToDB(books);

    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books from Google Books API' });
  }
};

const saveBooksToDB = async (books) => {
  try {
    for (let book of books) {
      const existing = await Book.findOne({ title: book.volumeInfo.title });
      if (existing) continue;

      const randomPrice = Math.floor(Math.random() * 41) + 10;

      const newBook = new Book({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
        description: book.volumeInfo.description || 'No description available.',
        publishedDate: book.volumeInfo.publishedDate || 'Unknown',
        thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
        price: randomPrice,
      });

      await newBook.save();
    }
  } catch (error) {
    console.error('Error saving books to DB:', error);
  }
};

module.exports = {
  searchBooks,
  saveBooksToDB
};