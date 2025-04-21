import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { authAPI } from "../../../services/api";

export const Account = ({ user }) => {
  const [nameFormData, setNameFormData] = useState({
    name: user?.name || ''
  });
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameSuccess, setNameSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [nameLoading, setNameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { updateUser } = useAuth();

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setNameFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setNameSuccess('');
    setNameLoading(true);

    try {
      // Validate name is not empty
      if (!nameFormData.name.trim()) {
        throw new Error('Name cannot be empty');
      }

      const response = await authAPI.updateName(nameFormData.name);
      
      // Update the user in context and localStorage
      updateUser({
        ...user,
        name: nameFormData.name
      });
      
      setNameSuccess('Name updated successfully!');
    } catch (err) {
      console.error('Error updating name:', err);
      setNameError(err.response?.data?.message || err.message || 'Failed to update name');
    } finally {
      setNameLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    setPasswordLoading(true);

    try {
      // Validate passwords match
      if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      // Validate password length
      if (passwordFormData.newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      await authAPI.updatePassword(
        passwordFormData.currentPassword,
        passwordFormData.newPassword
      );

      setPasswordSuccess('Password updated successfully!');
      // Clear password fields after successful update
      setPasswordFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setPasswordError(err.response?.data?.message || err.message || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
        
        {/* Name Update Form */}
        <form onSubmit={handleNameSubmit} className="space-y-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Update Name</h3>
            
            {nameError && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4">
                {nameError}
              </div>
            )}
            
            {nameSuccess && (
              <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-lg mb-4">
                {nameSuccess}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={nameFormData.name}
                  onChange={handleNameChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={nameLoading}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {nameLoading ? 'Saving...' : 'Update Name'}
            </button>
          </div>
        </form>

        {/* Password Update Form */}
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
            
            {passwordError && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4">
                {passwordError}
              </div>
            )}
            
            {passwordSuccess && (
              <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-lg mb-4">
                {passwordSuccess}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordFormData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordFormData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordFormData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={passwordLoading}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 