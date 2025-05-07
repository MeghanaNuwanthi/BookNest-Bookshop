import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToBooks = () => {
    navigate('/Book');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-[#C9B79C]">
        <h2 className="text-4xl font-semibold mb-4">Discover Your Next Great Read</h2>
        <p className="mb-8 text-lg">Browse thousands of books from classics to the latest releases</p>
        <button
          onClick={goToBooks}
          className="bg-[#A4452C] text-white px-6 py-2 rounded hover:bg-[#8c3823] transition"
        >
          Browse Books
        </button>
      </section>

      {/* cards */}

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-8">Book Genres</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Fantasy", subtitle: "Magical elements", image: "./src/assets/fantacy.jpeg" },
            { title: "Historical fiction", subtitle: "Fictional history", image: "./src/assets/Historical fiction.jpeg" },
            { title: "Lovecraftian horror", subtitle: "Cosmic dread", image: "./src/assets/Lovecraftian horror.jpeg" },
            { title: "Fairy tale", subtitle: "Moral lessons", image: "./src/assets/Fairy tale.jpeg" },
            { title: "Horror fiction", subtitle: "Disturbing narratives", image: "./src/assets/Horror fiction.jpeg" },
            { title: "Educational", subtitle: "Learning world", image: "./src/assets/Educational.jpeg" },
          ].map((genre, index) => (
            <div key={index} className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden">
              <img src={genre.image} alt={genre.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h4 className="text-[#A4452C] text-lg font-semibold">{genre.title}</h4>
                <p className="text-sm text-[#A4452C]">{genre.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}

export default Home;
