import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Validation from './SignupValidation'


const Signup = () => {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = async (event) => {
  event.preventDefault();
  
  // Perform validation
  const validationErrors = Validation(values);
  setErrors(validationErrors);
  console.log("Validation errors:", validationErrors);  // Log validation errors

  if (Object.keys(validationErrors).length === 0) {
    try {
      console.log("Sending signup request...");
      const res = await axios.post('http://localhost:4000/api/users/register', values);
      console.log("Signup response:", res.data);  // Log response data

      if (res.data.success) {
        console.log("Signup successful, navigating to home");
        navigate('/');  // Navigate to homepage if signup is successful
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error during signup:", err.response?.data || err.message);
      alert("An error occurred during signup. Please try again later.");
    }
  }
}


  return (
    <div className="flex justify-center items-center bg-black-500 h-screen">
      <div className="bg-white p-6 rounded-lg w-1/4">
        <h2 className='text-center text-black mt-4 text-xl'>Sign up</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              name='name'
              value={values.name}
              onChange={handleInput}
              className="text-black block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <span className='block text-sm font-medium text-red-700'>{errors.name}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              name='email'
              value={values.email}
              onChange={handleInput}
              className="text-black block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <span className='block text-sm font-medium text-red-700'>{errors.email}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              name='password'
              value={values.password}
              onChange={handleInput}
              className="text-black block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <span className='block text-sm font-medium text-red-700'>{errors.password}</span>}
          </div>
          <button type='submit' className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            Sign up
          </button>
          <p className="text-center text-gray-600 mt-4 text-sm">You agree to our terms and policies</p>
          <div className="flex flex-col items-center justify-center bg-gray-50">
            <Link to="/login" className="w-full max-w-xs text-center text-black py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
