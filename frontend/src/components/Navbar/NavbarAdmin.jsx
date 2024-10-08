import React, { useState } from "react";
import { IoIosNotifications, IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";


function NavbarAdmin() {
    const user = {
        token: null,
        firstName: 'Phat',
        jobTitle: 'Web dev',
        profileUrl: 'ddd',
        accountType: "User-profile"
    };
    const [isOpen, setIsOpen] = useState(false);
    const handlerCloseNavbar = () => {
        setIsOpen(prev => !prev)
    } 
    return (
        <>
            <div className='fixed top-0 l-0 r-0 t-0 w-full  bg-[#f7fdfd] z-50 shadow'>
                <nav className='container mx-auto flex items-center justify-between p-5'>
                    <div>
                        <Link to='/Admin' className="text-blue-600 font-bold text-xl">
                            Project<span className="text-[#1677cccb]">Finder</span>
                        </Link>
                    </div>
                    <div className="flex">
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-row items-center mr-1 text-base cursor-pointer">
                                <IoIosNotifications className="w-6 h-5"/>
                                <div className="leading-none mb-[2px] ml-[2px]">Notifications</div>
                            </div>
                            <div className="flex flex-row items-center mr-1 text-base cursor-pointer">
                                <IoMdMail className="w-6 h-5"/>
                                <div className="leading-none mb-[2px] ml-[2px]">Messages</div>
                            </div>
                            <div className="w-[1px] h-[30px] bg-[#c3c3c3] mr-4">
                            </div>

                        </div>
                       
                    </div>
                    
                </nav>
            </div>
        </>);
}

export default NavbarAdmin;