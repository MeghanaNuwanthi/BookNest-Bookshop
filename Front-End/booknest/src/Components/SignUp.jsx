import React, { useState } from 'react';

const SignUp = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.error || 'Failed to sign up.');
      } else {
        alert('Signup successful!');
        onClose();
      }
  
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong. Please try again.');
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#C9B79C]/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#F5F1EB] p-0 rounded shadow-md w-[850px] h-[500px] flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#6B4226] mb-4 text-left">SignUp to BookNest</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                onChange={handleChange} value={formData.email}
                className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 placeholder-[#6B4226] focus:outline-none" required />
            <input 
                name="username" 
                type="text" 
                placeholder="Username" 
                onChange={handleChange} value={formData.username}
                className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 placeholder-[#6B4226] focus:outline-none" required />
            <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                onChange={handleChange} value={formData.password}
                className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 placeholder-[#6B4226] focus:outline-none" required />
            <input 
                name="confirmPassword" 
                type="password" 
                placeholder="Confirm Password" 
                onChange={handleChange} value={formData.confirmPassword}
                className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 placeholder-[#6B4226] focus:outline-none" required />
            <input 
                name="phone" 
                type="tel" 
                placeholder="Telephone Number" 
                onChange={handleChange} value={formData.phone}
                className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 placeholder-[#6B4226] focus:outline-none" required />
            <input 
                name="address" 
                type="text" 
                placeholder="Address" 
                onChange={handleChange} value={formData.address}
                className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 placeholder-[#6B4226] focus:outline-none" required />
            
            {error && <p className="text-[#A4452C] text-sm italic">{error}</p>}
            
            <button type="submit" className="w-full bg-[#6B4226] text-white font-semibold py-2 rounded hover:bg-[#A4452C] transition">
              Sign Up
            </button>
          </form>
          
          <p className="text-sm mt-4 text-[#6B4226]">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="font-semibold text-black hover:underline">
              Login here
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

export default SignUp;
