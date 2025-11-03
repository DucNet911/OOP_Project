import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;
  
  const handleClose = () => {
    // Reset form state when closing the modal
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setIsLogin(true);
    onClose();
  };

  const determineRole = (email: string): User['role'] => {
    if (email.endsWith('@stu.ptit.edu.vn')) {
        return 'admin';
    }
    return 'customer';
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (!email || !password) {
        setError('Vui lòng điền đầy đủ thông tin.');
        return;
      }

      // Simulate successful login
      const role = determineRole(email);
      const name = role === 'admin' ? 'Admin User' : (fullName || email.split('@')[0]);
      const capitalizedUserName = name.charAt(0).toUpperCase() + name.slice(1);
      
      onLoginSuccess({ name: capitalizedUserName, role });
      handleClose(); // Close modal on success
    } else {
      // Registration logic
      if (!fullName || !email || !password) {
        setError('Vui lòng điền đầy đủ thông tin.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không khớp.');
        return;
      }
      // Simulate successful registration
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      setIsLogin(true); // Switch to login view
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gym-dark rounded-lg shadow-xl w-full max-w-md p-8 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Close modal">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="flex mb-6 border-b border-gray-700">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-lg font-bold transition-colors ${isLogin ? 'text-gym-yellow border-b-2 border-gym-yellow' : 'text-gym-gray'}`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-lg font-bold transition-colors ${!isLogin ? 'text-gym-yellow border-b-2 border-gym-yellow' : 'text-gym-gray'}`}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gym-gray mb-1">Họ và tên</label>
              <input 
                type="text" 
                id="fullName" 
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full bg-gym-darker border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-gym-yellow" 
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gym-gray mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-gym-darker border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-gym-yellow" 
              required
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gym-gray mb-1">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-gym-darker border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-gym-yellow" 
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirm-password"className="block text-sm font-medium text-gym-gray mb-1">Xác nhận mật khẩu</label>
              <input 
                type="password" 
                id="confirm-password" 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-gym-darker border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-gym-yellow" 
                required
              />
            </div>
          )}

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button type="submit" className="w-full bg-gym-yellow text-gym-darker font-bold py-3 rounded-md hover:bg-yellow-300 transition-colors mt-4">
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
          {isLogin && <a href="#" className="block text-center text-sm text-gym-gray hover:text-gym-yellow mt-2">Quên mật khẩu?</a>}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;