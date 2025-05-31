import React, { useContext, useRef, useState } from 'react';
import { FaBuildingColumns, FaCircleUser } from 'react-icons/fa6';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';
import { FaBuilding, FaFileSignature, FaPercentage, FaUser, FaUserShield, FaUserTie } from 'react-icons/fa';
import { SiCodeblocks } from 'react-icons/si';
import { TbCurrencyTaka, TbPercentage60 } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { MdAdminPanelSettings } from 'react-icons/md';


const AdminProfile = () => {
    const { user } = useContext(AuthContext)
    const [role, setRole] = useState('')
    const data = { email: user.email };

    const toastShownRef = useRef(false);
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



    const { data: members = [] } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_serverApiLink}/members`, {headers: {authorization: localStorage.getItem('access-token')}});
            toast.success('Loaded All Members', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "light",
            });
            return await response.json();
        },
    })

    const { data: admins = [] } = useQuery({
        queryKey: ['admins'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_serverApiLink}/admins`, {headers: {authorization: localStorage.getItem('access-token')}});
            toast.success('Loaded All Admins', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "light",
            });
            return await response.json();
        },
    })

    const { data: normalUser = [] } = useQuery({
        queryKey: ['normalUser'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_serverApiLink}/user`, {headers: {authorization: localStorage.getItem('access-token')}});
            toast.success('Loaded All Users', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "light",
            });
            return await response.json();
        },
    })

    const { data: apartments = [] } = useQuery({
        queryKey: ['apartments'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_serverApiLink}/apartments`);
            toast.success('Loaded All Apartments', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "light",
            });
            return await response.json();
        },
    })

    const available = apartments.filter(apartment => apartment.availability === true);
    const unavailable = apartments.filter(apartment => apartment.availability === false);

    const percentageAvailable = (available.length / apartments.length) * 100;
    const percentageUnavailable = (unavailable.length / apartments.length) * 100;

    const roundedPercentageAvailable = percentageAvailable.toFixed(2);
    const roundedPercentageUnavailable = percentageUnavailable.toFixed(2);

    return (
        <div className='lg:ml-[200px] flex flex-col items-center w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <FaCircleUser /> My Profile</h1>
            <ToastContainer></ToastContainer>
            <div className="flex flex-col  mt-14 h-[280px] lg:h-[280px] items-center justify-end gap-2 border border-black rounded-xl w-[450px] relative pb-5">
                <img src={user?.photoURL} alt={user?.displayName} className='w-[100px] h-[100px] bg-center bg-cover rounded-full border-4 border-black absolute -top-12' />
                <div className="flex flex-col gap-1 items-center">
                    <h1 className='text-2xl font-bold'>Welcome {role},</h1>
                    <h2 className='text-xl font-medium'>{user?.displayName}</h2>
                    <p className='text-white bg-black px-3 py-1  rounded-full'>{user?.email}</p>
                </div>
                <div className="flex w-11/12 px-3 py-2 rounded-xl flex-col bg-black text-white">
                    <div className="flex justify-between w-full items-center">
                        <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaBuilding />Number of Rooms:</span> {apartments.length}</h3>
                        <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaPercentage />Available Rooms:</span> {roundedPercentageAvailable}%</h3>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaPercentage />Unavailable Rooms:</span> {roundedPercentageUnavailable}%</h3>
                        <h3 className='text-md flex gap-0.5 justify-center items-center'><span className='flex gap-0.5 justify-center items-center font-medium'><FaUser />No of Users:</span> {normalUser.length}</h3>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaUserTie /> No of Members:</span> {members.length}</h3>
                        <h3 className='text-md flex gap-0.5 justify-center items-center'><span className='flex gap-0.5 justify-center items-center font-medium'><FaUserShield />No of Admins:</span> {admins.length}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;