import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="w-[30rem] flex flex-col space-y-10 p-5 bg-gray-800 rounded-md shadow-lg">
                <h1 className="text-center text-4xl font-medium">Log In</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b-2 bg-transparent text-lg">
                        <input
                            type="text"
                            placeholder="Email or Username"
                            className="w-full border-none bg-transparent outline-none placeholder:italic"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="border-b-2 bg-transparent text-lg">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border-none bg-transparent outline-none placeholder:italic"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-sm bg-indigo-600 py-2 font-bold hover:bg-indigo-400 transition duration-300"
                    >
                        LOG IN
                    </button>
                </form>

                <Link to="/forgot-password" className="text-center font-semibold text-gray-500 hover:text-gray-300 transition duration-300">
                    FORGOT PASSWORD?
                </Link>
                <p className="text-center text-lg">
                    No account?
                    <Link to="/register" className="font-medium text-indigo-500 underline-offset-4 hover:underline">
                        Create One
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;