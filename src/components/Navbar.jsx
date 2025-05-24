import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { GoHomeFill } from "react-icons/go";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { GrDashboard } from "react-icons/gr";
import { RiDashboardFill } from "react-icons/ri";



const Navbar = () => {
    const navigate = useNavigate()
    const { user, signOutUser } = useContext(AuthContext)

    const handleSignOut = () => {
        console.log(user)
        signOutUser()
        navigate('/')
    }
    const navLinks = <>
        <div className="flex lg:flex-row flex-col gap-2 font-medium">
            <NavLink to="/" className="px-2 py-1.5 rounded-lg flex gap-1 items-center"> <GoHomeFill /> Home</NavLink>
            <NavLink to="/apartments" className="px-2 py-1.5 rounded-lg flex gap-1 items-center"> <PiBuildingApartmentFill /> Apartments</NavLink>
        </div>
    </>
    return (
        <div className="bg-white border-b border-black flex flex-col">
            <nav className="py-2 px-3 flex flex-row justify-between items-center">
                <img src="/src/assets/Logo.png" alt="Rent Loft" className="w-[105px] mt-1" />
                <div className="text-black lg:flex hidden">{navLinks}</div>
                {
                    user ?
                        <div className="dropdown lg:flex hidden flex-row gap-4">

                            <div tabIndex={0} role="button" className=" rounded-full text-white border-white border flex justify-center items-center">
                                <div id="auth" className="p-2 rounded-full py-1 hidden lg:flex flex-row justify-center items-center gap-2">
                                    {/* <button onClick={handleSignOut} className="py-1 my-1 font-medium px-3 bg-[#c24444] gap-2 text-[16px] rounded-full text-white flex items-center"> Log Out <MdLogout /></button> */}
                                    <img className="w-[55px]  rounded-full border border-black h-[55px] bg-cover bg-center" src={user.photoURL ? user.photoURL : 'https://i.ibb.co.com/xLp370Q/39f240a04441d36e63432f10f21ff951.jpg'} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content right-2   bg-black border border-white rounded-box z-[5] mt-[80px] w-[150px]  p-2 gap-[15px] flex flex-col items-start text-[16px] text-[#0B0B0BB3] font-medium justify-center">
                                {
                                    user &&
                                    <div id="bars" className="p-2 rounded-full py-1 flex flex-col justify-start items-start gap-2">
                                        {/* <img className="w-[55px]  rounded-full border border-black h-[55px] bg-cover bg-center" src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co.com/FWDPjz3/Anime-Boy-Smile-1.jpg'} /> */}
                                        <p className="text-white select-none">{user?.displayName}</p>
                                        {/* <div className="text-white w-full " id="bars">{navLinks}</div> */}
                                        <NavLink to="/dashboard" className="px-2 py-1.5 rounded-lg flex gap-1 items-center text-white w-full border"> <RiDashboardFill /> Dashboard</NavLink>
                                        <button onClick={handleSignOut} className="py-1 my-1 font-medium px-3 bg-[#c24444] gap-2 text-[16px] rounded-full text-white flex items-center"> Log Out <MdLogout /></button>
                                    </div>
                                }
                            </ul>
                        </div>

                        :
                        <div id="auth" className="rounded-full py-1 hidden lg:flex flex-row justify-start items-center ml-3 gap-2">
                            <NavLink to="/login" className="py-1 font-medium px-3 bg-white border border-black gap-2 text-[16px] rounded-full text-black">Login</NavLink>
                            <NavLink to="/register" className="py-1 font-medium px-3 bg-white border border-black gap-2 text-[16px] rounded-full text-black">Register</NavLink>
                        </div>

                }
                <div className="lg:hidden flex gap-4">
                    <div className="lg:hidden flex">

                    </div>
                    <div className="dropdown lg:hidden flex flex-row gap-4">

                        <div tabIndex={0} role="button" className="w-10 h-10 bg-black rounded-full text-white border-white border flex justify-center items-center">
                            <HiMiniBars3BottomRight />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content right-2   bg-black border border-white rounded-box z-[5] mt-[80px] w-[150px]  p-2 gap-[15px] flex flex-col items-start text-[16px] text-[#0B0B0BB3] font-medium justify-center">

                            {
                                user ?
                                    <div id="auth" className="p-2 rounded-full py-1 flex flex-col justify-start items-start gap-2">
                                        <img className="w-[55px]  rounded-full border border-black h-[55px] bg-cover bg-center" src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co.com/FWDPjz3/Anime-Boy-Smile-1.jpg'} />
                                        <p className="text-white select-none">{user?.displayName}</p>
                                        <div className="text-white w-full " id="bars">
                                            {navLinks}
                                            <NavLink to="/dashboard" className="px-2 py-1.5 rounded-lg flex gap-1 items-center text-white w-full"> <RiDashboardFill /> Dashboard</NavLink>
                                        </div>
                                        <button onClick={handleSignOut} className="py-1 my-1 font-medium px-3 bg-[#c24444] gap-2 text-[16px] rounded-full text-white flex items-center"> Log Out <MdLogout /></button>
                                    </div>
                                    :
                                    <div id="bars" className="rounded-full py-1 flex flex-col justify-start items-start ml-3 gap-2">
                                        <div className="text-white w-full " id="bars">{navLinks}</div>
                                        <NavLink to="/login" className="py-1 font-medium px-3 bg-black border border-white gap-2 text-[16px] rounded-full text-white">Login</NavLink>
                                        <NavLink to="/register" className="py-1 font-medium px-3 bg-black border border-white gap-2 text-[16px] rounded-full text-white">Register</NavLink>
                                    </div>
                            }


                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;