import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OtpValidationForm = () => {
    const [otp, setOtp] = useState(Array(6).fill('')); // Assuming a 6-digit OTP

    const handleChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value.slice(0, 1); // Allow only one character per input
        setOtp(newOtp);

        // Move to the next input field automatically
        if (e.target.value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle OTP validation logic with `otp.join('')`
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-4">
            <div className="w-full max-w-md flex flex-col space-y-10 p-5 bg-gray-800 rounded-md shadow-lg">
                <h1 className="text-center text-4xl font-medium">Enter OTP</h1>

                <form onSubmit={handleSubmit} className="flex justify-center   gap-3 flex-wrap  ">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            id={`otp-input-${index}`}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            className="w-12 h-12 text-center border border-white bg-gray-800 rounded-md text-xl focus:outline-none focus:border-indigo-500 transition duration-200"
                            maxLength={1}
                        />
                    ))}
                </form>

                <button
                    onClick={handleSubmit}
                    className="mt-5 w-full rounded-sm bg-indigo-600 py-2 font-bold hover:bg-indigo-400 transition duration-300"
                >
                    Verify
                </button>

                <Link to="/resend-otp" className="text-center font-semibold text-indigo-300 hover:text-indigo-600 transition duration-300">
                    Resend OTP
                </Link>
                <Link to="/login" className="text-center font-semibold text-gray-500 hover:text-gray-300 transition duration-300">
                    BACK TO LOGIN
                </Link>
            </div>
        </div>
    );
};

export default OtpValidationForm;