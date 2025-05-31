import React, { useContext, useRef, useState } from 'react';
import { FaCircleUser, FaInbox, FaMoneyCheckDollar } from 'react-icons/fa6';
import { GoHomeFill } from 'react-icons/go';
import { RiDashboardFill, RiSecurePaymentFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { AiFillNotification } from "react-icons/ai";
import { AuthContext } from '../../providers/AuthProvider';
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoIosNotifications } from 'react-icons/io';
import { BiSolidCoupon } from "react-icons/bi";


const SideBar = () => {
    const { user } = useContext(AuthContext)
    const [role, setRole] = useState('')
    const toastShownRef = useRef(false);
    const data = { email: user.email };
    axios.post(`${import.meta.env.VITE_serverApiLink}/checkRole`, data)
        .then(res => {
            setRole(res?.data?.role);
            if (!toastShownRef.current) {
                toast.success(`Checked Role`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    theme: "light",
                });
                toastShownRef.current = true;
            }
        })
    const userNav = <>
        <NavLink to="/dashboard/myProfile" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <FaCircleUser /> My Profile</NavLink>
        <NavLink to="/dashboard/announcements" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <FaInbox /> Announcements</NavLink>
        {
            role === 'member' && <>
                <NavLink to="/dashboard/makePayment" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <FaMoneyCheckDollar /> Make Payment</NavLink>
                <NavLink to="/dashboard/paymentHistory" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <RiSecurePaymentFill /> Payment History</NavLink>
            </>
        }
        <NavLink to="/" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <GoHomeFill /> Home</NavLink>
    </>
    const adminNav = <>
        <NavLink to="/dashboard/adminProfile" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <MdAdminPanelSettings /> Admin Profile</NavLink>
        <NavLink to="/dashboard/manageMembers" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <FaCircleUser /> Manage Members</NavLink>
        <NavLink to="/dashboard/makeAnnouncement" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <AiFillNotification /> Make Announcement</NavLink>
        <NavLink to="/dashboard/agreementRequests" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <IoIosNotifications /> Agreement Requests</NavLink>
        <NavLink to="/dashboard/manageCoupons" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <BiSolidCoupon /> Manage Coupons</NavLink>
    <NavLink to="/" className="px-4 py-1.5 bg-black hover:bg-white text-white hover:text-black border border-white rounded-lg flex gap-1 items-center"> <GoHomeFill /> Home</NavLink>
    </>
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
                            <img src="/assets/LogoWhite.png" alt="Rent Loft" className='w-7/12 mt-4' />
                            <div id="sidebar" className="flex flex-col gap-3 mx-4 justify-center">
                                {role === 'admin' ? adminNav : userNav}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='h-screen fixed lg:w-[300px] hidden bg-black lg:flex flex-col items-center'>
                <img src="/assets/LogoWhite.png" alt="Rent Loft" className='w-10/12 mt-4' />
                <div id="sidebar" className="flex flex-col gap-3 mx-4 justify-center">
                    {role === 'admin' ? adminNav : userNav}
                </div>
            </div>
        </>
    );
};

export default SideBar;