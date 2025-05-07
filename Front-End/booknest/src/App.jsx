import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { FaUserCog } from 'react-icons/fa';
import './App.css';
import Home from './Components/Home';
import Book from './Components/Book';
import Cart from './Components/Cart';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Profile from './Components/Profile';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleSwitchToSignUp = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="bg-[#F5F1EB] text-[#333333] min-h-screen font-sans">
      {/* Header */}
      <header className="bg-[#6B4226] text-white py-4 px-8 shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">BookNest</h1>
          <nav className="space-x-6 flex flex-row items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#C9B79C] font-semibold'
                  : 'hover:text-[#C9B79C] transition duration-200'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Book"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#C9B79C] font-semibold'
                  : 'hover:text-[#C9B79C] transition duration-200'
              }
            >
              Book
            </NavLink>
            <NavLink
              to="/Cart"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#C9B79C] font-semibold'
                  : 'hover:text-[#C9B79C] transition duration-200'
              }
            >
              Cart
            </NavLink>

            {/* User Profile / Login Button */}
            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#A4452C] font-semibold'
                      : 'hover:text-[#A4452C] transition duration-200'
                  }
                >
                  <button
                    onClick={navigateToProfile}
                    className="hover:bg-[#C9B79C] rounded transition duration-500"
                    title="Profile"
                  >
                    <div className="text-white text-2xl text-center py-1 px-2">
                      <FaUserCog />
                    </div>
                  </button>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-[#A4452C] hover:bg-[#8a3a25] text-white px-4 py-4 rounded transition duration-200"
                >
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="hover:bg-[#C9B79C] rounded transition duration-500"
                title="Login"
              >
                <div className="text-white text-2xl text-center py-1 px-2">
                  <FiUser />
                </div>
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-[#6B4226] text-white text-center py-4">
        © 2025 BookNest. All rights reserved.
      </footer>

      {/* Modals */}
      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
        setUser={setUser} 
      />
      <SignUp
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
}

export default App;