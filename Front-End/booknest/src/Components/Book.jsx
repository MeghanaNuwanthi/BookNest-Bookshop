import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails';
import { useCart } from '../Components/CartContext';

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const { addToCart } = useCart();

  // Generate random price between $5 and $50
  const generateRandomPrice = () => {
    return (Math.random() * (50 - 5) + 5).toFixed(2);
  };

  
  // Fetch books based on search term
const fetchBooks = async (query = 'All') => {
  try {
    const res = await axios.get(`http://localhost:5000/api/books/search?query=${query}`);
    const items = res.data || [];

    // Assign random prices only if missing
    const booksWithPrices = items.map((book) => {
      const isGoogleBook = !!book.volumeInfo;
      const price =
        (isGoogleBook && book.saleInfo?.listPrice?.amount) ||
        book.price ||
        Math.floor(Math.random() * 20) + 10;

      return { ...book, price };
    });

    setBooks(booksWithPrices);
    setFilteredBooks(booksWithPrices);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};


  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    fetchBooks(keyword);
  };

  const handleSort = (e) => {
    const method = e.target.value;
    setSortBy(method);

    const sorted = [...filteredBooks].sort((a, b) => {
      const aInfo = a.volumeInfo || {};
      const bInfo = b.volumeInfo || {};
      if (method === 'title') {
        return (aInfo.title || '').localeCompare(bInfo.title || '');
      } else if (method === 'price') {
        const aPrice = a.saleInfo?.listPrice?.amount || a.price || parseFloat(generateRandomPrice());
        const bPrice = b.saleInfo?.listPrice?.amount || b.price || parseFloat(generateRandomPrice());
        return aPrice - bPrice;
      }
      return 0;
    });

    setFilteredBooks(sorted);
  };

  return (
    <div className="px-2 py-4 max-w-6xl mx-auto bg-[#F5F1EB] min-h-screen">
      <h2 className="text-3xl font-bold text-[#6B4226] mb-6 text-center">Books List</h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="px-4 py-2 border border-[#6B4226] rounded w-full md:w-1/2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          value={sortBy}
          onChange={handleSort}
          className="px-4 py-2 border border-[#6B4226] rounded"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book, i) => {
          const isGoogleBook = !!book.volumeInfo;
          const volumeInfo = isGoogleBook ? book.volumeInfo : book;
          const imageLinks = isGoogleBook ? (volumeInfo.imageLinks || {}) : {};
          const authors = isGoogleBook ? (volumeInfo.authors || []) : [book.author];

          const actualPrice = isGoogleBook
            ? (book.saleInfo?.saleability === 'FOR_SALE' ? book.saleInfo?.listPrice?.amount : null)
            : book.price;

          const displayPrice = actualPrice || generateRandomPrice();

          return (
            <div
              key={book.id || i}
              className="bg-[#C9B79C] rounded shadow p-4 transition duration-300 hover:scale-102 hover:shadow-xl"
            >
              <div onClick={() => setSelectedBook(book)} className="cursor-pointer">
                <div className="h-40 bg-[#F5F1EB] mb-4 flex items-center justify-center text-[#6B4226] font-bold">
                  {imageLinks.thumbnail ? (
                    <img src={imageLinks.thumbnail} alt={volumeInfo.title} className="h-full" />
                  ) : (
                    'No Image'
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[#6B4226]">{volumeInfo.title}</h3>
                <p className="text-sm text-[#333333]">
                  By {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}
                </p>
                
              </div>
              <button
                onClick={() => addToCart(book)}
                className="mt-4 bg-[#A4452C] text-white text-sm px-4 py-2 rounded hover:bg-[#8c3823] w-1/3 transition duration-200"
              >
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>

      {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
  );
}

export default Books;
