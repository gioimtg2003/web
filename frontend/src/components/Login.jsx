import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './LoginValidation'; 

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post('http://localhost:4000/api/users/login', values);
        if (res.data.success) {
          navigate('/');
        } else {
          alert(res.data.message || "Login failed");
        }
      } catch (err) {
        console.error("Error during login:", err.response.data || err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-black-500 h-screen">
      <div className="bg-white p-6 rounded-lg w-1/4">
        <h2 className="text-center text-black mt-4 text-xl">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className="text-black block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter email"
            />
            {errors.email && <span className="block text-sm font-medium text-red-700">{errors.email}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInput}
              className="text-black block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter password"
            />
            {errors.password && <span className="block text-sm font-medium text-red-700">{errors.password}</span>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Log in
          </button>
          <p className="text-center text-gray-600 mt-4 text-sm">You agree to our terms and policies</p>
          <div className="flex flex-col items-center justify-center bg-gray-50">
            <Link
              to="/signup"
              className="w-full max-w-xs text-center text-black py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

