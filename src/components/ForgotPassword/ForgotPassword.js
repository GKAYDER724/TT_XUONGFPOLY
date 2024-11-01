import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
      
      if (response.data.status) {
        setMessage(response.data.message);
        setMessageColor('green');
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
      <div className="card-body">
        <img
          src="https://via.placeholder.com/150x50?text=iNET"
          alt="iNET"
          className="mb-4 mx-auto d-block"
        />
        <h5 className="card-title mb-4 text-center">Quên Mật Khẩu</h5>
        {message && (
          <div style={{ color: messageColor, marginBottom: '1em', textAlign: 'center' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group text-left">
            <label htmlFor="email">Email đăng nhập</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              style={{ marginTop: '0.5em' }}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Gửi liên kết đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  </div>
);
}

export default ForgotPassword;