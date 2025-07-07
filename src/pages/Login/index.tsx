import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import toast from 'react-hot-toast';
const backendUrl = import.meta.env.VITE_BACKEND_URL; 

const otpSchema = z.object({
    verifyOtp: z.string().min(6, "OTP must be at least 6 numbers")
})
const emailSchema = z.object({
    email: z.string().email('Invalid email address'),
});
const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [verifyOtp, setVerifyOtp] = useState('');
    const handleGetOtp = async () => {
        try {
            setLoading(true)
            const result = emailSchema.safeParse({ email });
            if (!result.success) {
                const errorMessage = result.error.errors[0]?.message;
                toast.error(errorMessage);
                return;
            }
            const response = await axios.post(`${backendUrl}/auth/getOtp`, {
                email,
            });

            setOtp(response.data.otp)
            setLoading(false)
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    const handleSignIn = async () => {
        setLoading(true)
        const result = otpSchema.safeParse({ verifyOtp });
        if (!result.success) {
            const errorMessage = result.error.errors[0]?.message;
            toast.error(errorMessage);
            return;
        }
        const response = await axios.post(`${backendUrl}/auth/sign-in`, {
            email,
        });
        if (response.status === 200) {
            if (otp === verifyOtp) {
                toast.success('Sign-ip successfully');
                navigate('/');
                localStorage.setItem("token", response.data.token);
            } else {
                toast.error("Please enter valid OTP")
            }
        }
        setLoading(false)
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
                        Sign in
                    </h1>
                    <div className="w-full flex-1 mt-8">
                        <div className=" mb-4 text-center">
                            <div
                                className=" px-2  text-sm text-gray-600  font-medium bg-white">
                                Please login to contribute to your account
                            </div>
                        </div>

                        <div className="mx-auto">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-white border border-black placeholder-black text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                                type="email" placeholder="Email" />

                            {otp !== "" && (

                                <input
                                    value={verifyOtp}
                                    onChange={(e) => setVerifyOtp(e.target.value)}
                                    className=" mt-5 w-full px-8 py-4 rounded-lg font-medium bg-white border border-black placeholder-black text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                                    type="text"
                                    placeholder='Enter OTP'
                                />
                            )}
                            {otp === "" && (
                                <button
                                    onClick={handleGetOtp}
                                    disabled={loading}
                                    className={` text-white mt-5 tracking-wide font-semibold w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none
                                    ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer text-gray-100'}`}
                                >
                                    Get OTP
                                </button>
                            )}
                            {otp !== "" && (
                                <button
                                    onClick={handleSignIn}
                                    disabled={loading}
                                    className={` text-white mt-5 tracking-wide font-semibold w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none
                                    ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer text-gray-100'}`}
                                >
                                    Sign-In
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
    )
}

export default Login