import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL; 

const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z
        .string()
        .min(8, 'Name must be at least 8 characters'),
    date: z.string().date(),
});

const otpSchema = z.object({
    verifyOtp: z.string().min(6, "OTP must be at least 6 numbers")
})
const SignUpForm: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [otp, setOtp] = useState('');
    const [verifyOtp, setVerifyOtp] = useState('');

    const handleGetOtp = async () => {
        try {
            setLoading(true)
            const result = signUpSchema.safeParse({ email, name, date });
            if (!result.success) {
                const errorMessage = result.error.errors[0]?.message;
                toast.error(errorMessage);
                return;
            }
            const response = await axios.post(`${backendUrl}/auth/getOtp`, {
                email,
            });
            setOtp(response.data.otp)
            toast.success('OTP has been sent to your email!');
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false)
        }
    };

    const handleSignUp = async () => {
        setLoading(true)
        const result = otpSchema.safeParse({ verifyOtp });
        if (!result.success) {
            const errorMessage = result.error.errors[0]?.message;
            toast.error(errorMessage);
            return;
        }
        if (otp === verifyOtp) {
            const response = await axios.post(`${backendUrl}/auth/sign-up`, {
                name,
                email,
                date,
            });
            toast.success('Sign-Up successfully');
            navigate('/login');
            localStorage.setItem("user", response.data.user)
            setLoading(false)
        } else {
            toast.error("Please enter valid OTP")
        }
    }
    return (
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div>
                    <img src="/top.png"
                        className="w-60 mx-auto" />
                </div>
                <div className="mt-12 flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold">
                        Sign up
                    </h1>
                    <div className="w-full flex-1 mt-8">
                        <div className=" mb-4 text-center">
                            <div
                                className=" px-2  text-sm text-gray-600  font-medium bg-white">
                                Sign up to enjoy the features of HD
                            </div>
                        </div>

                        <div className="mx-auto">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-white border border-black placeholder-black text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                                type="email" placeholder="Email" />
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className=" mt-5 w-full px-8 py-4 rounded-lg font-medium bg-white border border-black placeholder-black text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                                type="name" placeholder="Name" />
                            <input
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className=" mt-5 w-full px-8 py-4 rounded-lg font-medium bg-white border border-black placeholder-black text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                                type="date" />

                            {otp !== "" && (

                                <input
                                    value={verifyOtp}
                                    onChange={(e) => setVerifyOtp(e.target.value)}
                                    // disabled={otp === ""}
                                    className=" mt-5 w-full px-8 py-4 rounded-lg font-medium bg-white border border-black placeholder-black text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                                    type="text"
                                    placeholder='Enter OTP'
                                />
                            )}
                            {otp === "" && (
                                <button
                                    onClick={handleGetOtp}
                                    disabled={loading}
                                    className="mt-5 cursor-pointer tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    Get OTP
                                </button>
                            )}
                            {otp !== "" && (
                                <button
                                    onClick={handleSignUp}
                                    disabled={loading}
                                    className="mt-5 cursor-pointer tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center disabled:cursor-not-allowed disabled:bg-blue-300 justify-center focus:shadow-outline focus:outline-none">
                                    Sign-Up
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1  text-center hidden lg:flex">
                <div className=" w-full bg-contain bg-center bg-no-repeat">
                    <img src="/right-column.png"
                        className="w-fit mx-auto" />
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
