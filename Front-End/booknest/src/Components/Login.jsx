import React, { useState } from 'react';

const Login = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
  
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password, address: address, phone: phone, username: username }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }
  
      // Store token and user info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
  
      console.log('Login successful:', data);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#C9B79C]/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#F5F1EB] p-0 rounded shadow-md w-[850px] h-[500px] flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#6B4226] mb-6 text-left">Login to BookNest</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="E-mail"
              className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 placeholder-[#6B4226] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 placeholder-[#6B4226] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="ml-2 block text-gray-700 text-sm">
                Remember me
              </label>
            </div>
            {error && <p className="text-[#A4452C] text-sm italic">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#6B4226] text-white font-semibold py-2 rounded hover:bg-[#A4452C] transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm mt-6 text-[#6B4226]">
            New to BookNest?{' '}
            <button onClick={onSwitchToSignUp} className="font-semibold text-black hover:underline">
              Create an account
            </button>
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-[#F7E3CD] relative flex items-center justify-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#6B4226] hover:text-[#A4452C]">
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 8.586L4.293 2.879A1 1 0 002.879 4.293L8.586 10l-5.707 5.707a1 1 0 101.414 1.414L10 11.414l5.707 5.707a1 1 0 001.414-1.414L11.414 10l5.707-5.707a1 1 0 00-1.414-1.414L10 8.586z" clipRule="evenodd" />
            </svg>
          </button>
          <img
            src="./src/assets/Login-img.png"
            alt="Online bookstore illustration"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
