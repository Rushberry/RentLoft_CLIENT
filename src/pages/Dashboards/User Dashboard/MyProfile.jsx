import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaBuildingColumns, FaCircleUser } from 'react-icons/fa6';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import { FaBuilding, FaFileSignature } from 'react-icons/fa';
import { SiCodeblocks } from 'react-icons/si';
import { TbCurrencyTaka } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';


const MyProfile = () => {
    const { user } = useContext(AuthContext)
    const [role, setRole] = useState('')
    const [info, setInfo] = useState({})
    const data = { email: user.email };
    const toastShownRef = useRef(false);
    const toastShownRef2 = useRef(false);
    axios.post(`${import.meta.env.VITE_serverApiLink}/checkRole`, data)
        .then(res => {
            const data = res?.data?.role;
            const userRole =
                data.charAt(0).toUpperCase()
                + data.slice(1)
            setRole(userRole)
            if (!toastShownRef.current) {
                toast.success(`Welcome ${userRole}`, {
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
    useEffect(() => {
        if (role === 'Member') {
            const data = { email: user.email };
            axios.post(`${import.meta.env.VITE_serverApiLink}/apartmentRentInfo`, data)
                .then(res => {
                    // console.log(res.data)
                    setInfo(res.data)
                    if (!toastShownRef2.current) {
                        toast.success(`Loaded ${role} Details`, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: false,
                            theme: "light",

                        })
                        toastShownRef.current = true;
                    }
                })
        }
    }, [role])
    return (
        <div className='lg:ml-[300px] flex flex-col items-center w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <FaCircleUser /> My Profile</h1>
            <ToastContainer></ToastContainer>
            <div className="flex flex-col  mt-14 h-[280px] lg:h-[280px] items-center justify-end gap-2 border border-black rounded-xl w-[400px] relative pb-5">
                <img src={user?.photoURL} alt={user?.displayName} className='w-[100px] h-[100px] bg-center bg-cover rounded-full border-4 border-black absolute -top-12' />
                <div className="flex flex-col gap-1 items-center">
                    <h1 className='text-2xl font-bold'>Welcome {role},</h1>
                    <h2 className='text-xl font-medium'>{user?.displayName}</h2>
                    <p className='text-white bg-black px-3 py-1  rounded-full'>{user?.email}</p>
                </div>
                <div className="flex w-11/12 px-3 py-2 rounded-xl flex-col bg-black text-white">
                    {role === 'Member' ? <>
                        <h3 className='text-md flex gap-1 justify-center items-center'> <FaFileSignature /> Agreement Accept Date: {info?.acceptDate}</h3>
                        <div className="flex justify-between w-full items-center">
                            <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaBuildingColumns />Floor:</span> {info?.floor}</h3>
                            <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaBuilding />Block:</span> {info?.block}</h3>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><SiCodeblocks />Apartment No:</span> {info?.apartmentNo}</h3>
                            <h3 className='text-md flex gap-0.5 justify-center items-center'><span className='flex gap-0.5 justify-center items-center font-medium'><TbCurrencyTaka />Rent:</span> {info?.rent}</h3>
                        </div>
                    </> : <>
                        <h3 className='text-md flex gap-1 justify-center items-center'> <FaFileSignature /> Agreement Accept Date: None</h3>
                        <div className="flex justify-between w-full items-center">
                            <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaBuildingColumns />Floor:</span> None</h3>
                            <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaBuilding />Block:</span> None</h3>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><SiCodeblocks />Apartment No:</span> None</h3>
                            <h3 className='text-md flex gap-0.5 justify-center items-center'><span className='flex gap-0.5 justify-center items-center font-medium'><TbCurrencyTaka />Rent:</span> None</h3>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;