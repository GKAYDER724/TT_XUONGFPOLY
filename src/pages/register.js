import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false); // state để hiển thị mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // state để hiển thị nhập lại mật khẩu
  const password = watch('password');

  const onSubmit = (data) => {
    console.log(data);
    // Thực hiện logic đăng ký tại đây (ví dụ: gọi API)
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ maxWidth: '600px', width: '100%', padding: '20px' }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Đăng ký tài khoản</h3>
          <p className="text-muted text-center">
            Một tài khoản sử dụng cho tất cả các dịch vụ của iNET
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Tên đầy đủ */}
            <div className="form-group">
              <label>Tên đầy đủ</label>
              <input
                type="text"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                {...register('fullName', {
                  required: 'Vui lòng nhập tên đầy đủ',
                  minLength: { value: 3, message: 'Tên phải có ít nhất 3 ký tự' },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Tên không được chứa số hoặc ký tự đặc biệt'
                  }
                })}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
            </div>

            {/* Email */}
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                {...register('email', {
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email không hợp lệ'
                  }
                })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            {/* Số điện thoại */}
            <div className="form-group mt-3">
              <label>Điện thoại</label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                {...register('phone', {
                  required: 'Vui lòng nhập số điện thoại',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Số điện thoại phải có từ 10 chữ số'
                  }
                })}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
            </div>

            {/* Mật khẩu */}
            <div className="form-group mt-3">
              <label>Mật khẩu</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'} // Đổi type dựa trên state showPassword
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  {...register('password', {
                    required: 'Vui lòng nhập mật khẩu',
                    minLength: { value: 8, message: 'Mật khẩu phải ít nhất 8 ký tự' },
                    validate: {
                      hasUpperCase: value => /[A-Z]/.test(value) || 'Mật khẩu phải có ít nhất 1 chữ in hoa',
                      hasLowerCase: value => /[a-z]/.test(value) || 'Mật khẩu phải có ít nhất 1 chữ thường',
                      hasNumber: value => /\d/.test(value) || 'Mật khẩu phải có ít nhất 1 chữ số',
                      hasSpecialChar: value => /[!@#$%^&*]/.test(value) || 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'
                    }
                  })}
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text"
                    onClick={() => setShowPassword(!showPassword)} // Đổi trạng thái showPassword khi click
                    style={{ cursor: 'pointer' }}
                  >
                    <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}></i> {/* Icon con mắt */}
                  </span>
                </div>
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="form-group mt-3">
              <label>Nhập lại mật khẩu</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  {...register('confirmPassword', {
                    required: 'Vui lòng nhập lại mật khẩu',
                    validate: (value) => value === password || 'Mật khẩu không khớp'
                  })}
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className={showConfirmPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}></i> {/* Icon con mắt */}
                  </span>
                </div>
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
              </div>
            </div>

            <p className="mt-3 text-center">
              Khi click nút đăng ký, nghĩa là bạn đã đồng ý với 
              <a href="#" className="ml-1">chính sách bảo mật</a> và   
              <a href="#" className="ml-1">thỏa thuận sử dụng</a> của chúng tôi.
            </p>

            <button type="submit" className="btn btn-primary w-100 mt-3">Đăng ký</button>
          </form>

         <p className='text-center mt-4'>
          Bạn đã có tài khoản?
          <a className='btn-link link-singup' type='button' href='./login'>Đăng nhập</a>
         </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
