import React from 'react';

function BookDetails({ book, onClose }) {
  if (!book) return null;

  const volumeInfo = book.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const price = book.price || 'N/A'; // Use price from Books.jsx

  return (
    <div className="fixed inset-0 bg-[#F5F1EB]/50 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-[#C9B79C] p-6 rounded-md shadow-md max-w-4xl w-full relative">
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B4226] text-xl font-bold hover:text-[#A4452C]"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Book Image */}
          <div className="w-1/3 bg-[#F5F1EB] flex items-center justify-center text-[#6B4226] font-semibold h-48">
            {imageLinks.thumbnail ? (
              <img src={imageLinks.thumbnail} alt={volumeInfo.title} className="h-full" />
            ) : (
              'No Image'
            )}
          </div>

          {/* Book Data */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#333333] mb-2">
              Book Title: {volumeInfo.title || 'N/A'}
            </h2>
            <p className="text-[#333333] mb-1">
              Author Name: {volumeInfo.authors?.[0] || 'Unknown'}
            </p>
            <p className="text-[#333333] mb-1">
              Price: {price !== 'N/A' ? `$${price}` : 'Price Not Available'}
            </p>
            <p className="text-[#333333] mb-4">
              Published Date: {volumeInfo.publishedDate || 'N/A'}
            </p>

            <p className="text-sm text-[#333333] leading-relaxed mb-4">
              {volumeInfo.description
                ? volumeInfo.description.slice(0, 200) + '...'
                : 'Discover more about this captivating book that has inspired readers around the world.'}
            </p>
            <p className="text-sm text-[#333333]">
              Stock: {volumeInfo.pageCount > 100 ? 'Available' : 'Limited Stock'}
            </p>

            <button className="mt-4 bg-[#A4452C] text-white px-4 py-2 rounded hover:bg-[#8c3823] transition duration-300">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
