import React from 'react';
import { FaCircleUser, FaInbox } from 'react-icons/fa6';
import { GoHomeFill } from 'react-icons/go';
import { NavLink } from 'react-router-dom';

const userNav = <>
    <NavLink to="/dashboard/user/myProfile" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <FaCircleUser /> My Profile</NavLink>
    <NavLink to="/dashboard/user/announcements" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <FaInbox /> Announcements</NavLink>
    <NavLink to="/" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <GoHomeFill /> Home</NavLink>
</>
const SideBar = () => {
    return (
        <>
            <div className='h-screen fixed lg:w-[200px] hidden bg-black lg:flex flex-col items-center'>
                <img src="/src/assets/LogoWhite.png" alt="Rent Loft" className='w-10/12 mt-4' />
                <div id="sidebar" className="flex flex-col gap-3 mx-4 justify-center">
                    {userNav}
                </div>
            </div>
        </>
    );
};

export default SideBar;