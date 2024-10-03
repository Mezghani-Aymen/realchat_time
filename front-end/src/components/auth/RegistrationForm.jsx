import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="w-[30rem] flex flex-col space-y-10 p-5 bg-gray-800 rounded-md shadow-lg">
                <h1 className="text-center text-4xl font-medium">Register</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b-2 bg-transparent text-lg">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full border-none bg-transparent outline-none placeholder:italic"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="border-b-2 bg-transparent text-lg">
                        <input
                            type="email"
                            placeholder="Email"
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

                    <div className="border-b-2 bg-transparent text-lg">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full border-none bg-transparent outline-none placeholder:italic"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-sm bg-indigo-600 py-2 font-bold hover:bg-indigo-400 transition duration-300"
                    >
                        REGISTER
                    </button>
                </form>

                <p className="text-center text-lg">
                    Already have an account?
                    <Link to="/login" className="font-medium text-indigo-500 underline-offset-4 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;