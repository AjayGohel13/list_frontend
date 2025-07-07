import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate();
    const handleSignOut = () => { 
        localStorage.removeItem("token");
        navigate("/sign-in")
        toast.success("Sign-out successfully")
     }
    return (
        <header className=' py-8  '>
            <div className="max-w-screen-2xl mx-auto ">
                <div className="w-full flex items-center justify-between">
                    <div className="flex item-center w-full justify-between lg:gap-x-16 ">
                        <div>
                            <Link to="/">
                                <div className="item-center flex justify-center ">
                                    <img src='/logo.png' alt='logo' height={28} width={50} />
                                    <h1 className=" text-2xl font-semibold text-black ml-4">Dashboard</h1>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <div className="item-center flex justify-center ">
                                <button
                                    onClick={()=> handleSignOut()}
                                    className=" cursor-pointer text-xl font-semibold text-blue-600 border-b border-blue-600 ml-4">Sign-Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header
