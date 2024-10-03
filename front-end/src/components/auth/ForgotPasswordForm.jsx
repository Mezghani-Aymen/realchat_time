import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset logic
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="w-[30rem] flex flex-col space-y-10 p-5 bg-gray-800 rounded-md shadow-lg">
                <h1 className="text-center text-4xl font-medium">Forgot Password</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b-2 bg-transparent text-lg">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border-none bg-transparent outline-none placeholder:italic"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-sm bg-indigo-600 py-2 font-bold hover:bg-indigo-400 transition duration-300"
                    >
                        SEND RESET LINK
                    </button>
                </form>

                <Link to="/login" className="text-center font-semibold text-gray-500 hover:text-gray-300 transition duration-300">
                    BACK TO LOGIN
                </Link>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;