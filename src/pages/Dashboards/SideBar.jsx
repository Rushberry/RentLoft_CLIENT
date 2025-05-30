import React from 'react';
import { FaCircleUser, FaInbox } from 'react-icons/fa6';
import { GoHomeFill } from 'react-icons/go';
import { RiDashboardFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const userNav = <>
    <NavLink to="/dashboard/user/myProfile" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <FaCircleUser /> My Profile</NavLink>
    <NavLink to="/dashboard/user/announcements" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <FaInbox /> Announcements</NavLink>
    <NavLink to="/" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <GoHomeFill /> Home</NavLink>
</>
const SideBar = () => {
    return (
        <>
            <div className="relative">
                <div className="drawer absolute lg:hidden">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content absolute">
                    <label htmlFor="my-drawer" className="bg-black flex absolute lg:hidden rounded-md mt-3 ml-3 px-3 py-2 text-white font-medium justify-center items-center
                    gap-2 drawer-button"> <RiDashboardFill /> Dashbaord</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul id="sidebar" className="menu bg-black min-h-full w-80 p-4 flex flex-col gap-3 items-center">
                        {/* Sidebar content here */}
                        <img src="/src/assets/LogoWhite.png" alt="Rent Loft" className='w-7/12 mt-4' />
                        <div id="sidebar" className="flex flex-col gap-3 mx-4 justify-center">
                            {userNav}
                        </div>
                    </ul>
                </div>
            </div>
            </div>
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