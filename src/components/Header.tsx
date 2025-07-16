import { Link } from "react-router-dom"

const Header = () => {

    return (
        <header className=' py-8  '>
            <div className="max-w-screen-2xl mx-auto ">
                <div className="w-full flex items-center justify-between">
                    <div className="flex item-center w-full justify-between lg:gap-x-16 ">
                        <div>
                            <Link to="/">
                                <div className="flex item-center h-16 w-16 justify-center ">
                                    <img src='/logo.png' alt='logo' />
                                </div>
                            </Link>
                        </div>
                        <div>
                            <div className="item-center flex justify-center ">
                                <div
                                    className=" cursor-pointer text-2xl font-semibold text-blue-600 ml-4">Country</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header
