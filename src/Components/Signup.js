// src/Components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegistrationError('');

        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', cred.user.uid), {
                Name: fullName,
                Email: email,
            });

            setFullName('');
            setEmail('');
            setPassword('');
            navigate('/login');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setRegistrationError('This email address is already in use. Please use a different email.');
            } else {
                setRegistrationError(err.message);
            }
        }
    };

    return (
        <div className='flex w-full h-screen xl:flex-row flex-col justify-center items-center bg-[#F5F5DC] gap-8 p-4'>
            <div className='xl:w-1/2 w-full flex justify-center xl:mt-0 mt-7 p-4 sm:pt-6'>
                <img
                    src='signupimage.png'
                    alt='signup'
                    className='w-full h-auto  rounded-lg shadow-md pt-14'
                />
            </div>
            <div className='xl:w-1/2 w-full max-w-md xl:mb-0 mb-10 p-4 sm:p-6'>
                <h2 className='text-3xl font-bold mb-6 text-center'>Register Here</h2>
                <form autoComplete='off' onSubmit={handleRegister} className='flex flex-col gap-4'>
                    <label className='text-lg font-medium'>Enter Full Name</label>
                    <input
                        type='text'
                        className='p-2 border border-gray-300 rounded'
                        required
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                    />
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
                        Register
                    </button>
                </form>
                {registrationError && (
                    <div className='mt-4 text-red-500 text-center'>
                        {registrationError}
                    </div>
                )}
                <div className='mt-4 text-center'>
                    <span>
                        Already have an account? Login{' '}
                        <Link to='/login' className='text-[#457B9D] hover:underline'>
                            here
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Signup;
