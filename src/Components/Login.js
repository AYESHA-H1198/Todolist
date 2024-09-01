import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/todo'); // Redirect to the to-do app
        } catch (err) {
            setLoginError(err.message);
        }
    };

    return (
        <div className='flex w-full h-screen justify-center items-center bg-[#F5F5DC] p-4 flex-col xl:flex-row'>
          <div className='flex xl:order-none order-1 flex-col'>
            <img src='loginimage.png' alt='login' />
          </div>
            <div className='max-w-md w-full order-2 xl:order-none'>
                <h2 className='text-3xl font-bold mb-6 text-center'>Login</h2>
                <form autoComplete='off' onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <label className='text-lg font-medium'>Enter Email</label>
                    <input
                        type='email'
                        className='p-2 border border-gray-300 rounded'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <label className='text-lg font-medium'>Enter Password</label>
                    <input
                        type='password'
                        className='p-2 border border-gray-300 rounded'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button
                        type='submit'
                        className='px-5 py-2 bg-[#457B9D] text-white rounded-lg hover:bg-[#3A6F8F] transition-colors'
                    >
                        Login
                    </button>
                </form>
                {loginError && (
                    <div className='mt-4 text-red-500 text-center'>
                        {loginError}
                    </div>
                )}
                <div className='mt-4 text-center'>
                    <span>Don't have an account? Register <Link to='/signup' className='text-[#457B9D] hover:underline'>here</Link></span>
                </div>
            </div>
        </div>
    );
};

export default Login;
