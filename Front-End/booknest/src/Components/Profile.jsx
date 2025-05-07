// Components/Profile.jsx
import React, { useState } from 'react';
import { FaEdit, FaSave, FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset form if cancelling edit
      setFormData({
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      // Update local storage and state
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Update error:', err);
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-[#6B4226] p-6 sm:p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-[#C9B79C] p-3 rounded-full">
                  <FaUser className="text-2xl text-[#6B4226]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user?.username}</h1>
                  <p className="text-[#F7E3CD]">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleEditToggle}
                className={`flex items-center space-x-1 px-4 py-2 rounded-md ${isEditing ? 'bg-[#A4452C]' : 'bg-[#C9B79C] hover:bg-[#A4452C]'} transition duration-200`}
              >
                {isEditing ? (
                  <>
                    <FaSave className="text-sm" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <FaEdit className="text-sm" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Username Field */}
                <div className="border-b border-[#F7E3CD] pb-6">
                  <div className="flex items-center mb-2">
                    <FaUser className="text-[#6B4226] mr-2" />
                    <label className="block text-sm font-medium text-[#6B4226]">Username</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 focus:outline-none"
                      required
                    />
                  ) : (
                    <p className="text-[#333333]">{user?.username}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="border-b border-[#F7E3CD] pb-6">
                  <div className="flex items-center mb-2">
                    <FaEnvelope className="text-[#6B4226] mr-2" />
                    <label className="block text-sm font-medium text-[#6B4226]">Email</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 focus:outline-none"
                      required
                    />
                  ) : (
                    <p className="text-[#333333]">{user?.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="border-b border-[#F7E3CD] pb-6">
                  <div className="flex items-center mb-2">
                    <FaPhone className="text-[#6B4226] mr-2" />
                    <label className="block text-sm font-medium text-[#6B4226]">Phone Number</label>
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 focus:outline-none"
                      required
                    />
                  ) : (
                    <p className="text-[#333333]">{user?.phone || 'Not provided'}</p>
                  )}
                </div>

                {/* Address Field */}
                <div className="border-b border-[#F7E3CD] pb-6">
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-[#6B4226] mr-2" />
                    <label className="block text-sm font-medium text-[#6B4226]">Address</label>
                  </div>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-[#F7E3CD] border border-[#6B4226] text-[#6B4226] rounded px-4 py-2 focus:outline-none"
                      rows="3"
                      required
                    />
                  ) : (
                    <p className="text-[#333333] whitespace-pre-line">{user?.address || 'Not provided'}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-6 py-2 bg-[#A4452C] text-white rounded-md hover:bg-[#8a3a25] transition duration-200"
                  >
                    Logout
                  </button>
                  
                  {isEditing && (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#6B4226] text-white rounded-md hover:bg-[#5a3821] transition duration-200"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;