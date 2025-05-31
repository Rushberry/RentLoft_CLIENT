import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaBuilding, FaUserCircle } from 'react-icons/fa';
import { FaBuildingColumns } from 'react-icons/fa6';
import { IoIosNotifications } from 'react-icons/io';
import { IoDocumentText } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { SiCodeblocks } from 'react-icons/si';
import { TbCurrencyTaka } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const AgreementRequests = () => {
    const { data: apartmentRequests = [], refetch } = useQuery({
        queryKey: ['apartmentRequests'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_serverApiLink}/apartmentRent`, {headers: {authorization: localStorage.getItem('access-token')}});
            toast.success('Loaded Agreement Requests', {
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
    const handleReject = (e, i) => {
        const data = { id: e, apartmentId: i }
        axios.patch(`${import.meta.env.VITE_serverApiLink}/reject`, data, {headers: {authorization: localStorage.getItem('access-token')}})
            .then(res => {
                toast.success(`${res.data.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    theme: "light",
                });
                refetch()
            })
    }
    const handleAccept = (id, e, i) => {
        const today = new Date();

        const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        const data = { id: id, email: e, date: formattedDate, apartmentId: i }
        axios.patch(`${import.meta.env.VITE_serverApiLink}/accept`, data, {headers: {authorization: localStorage.getItem('access-token')}})
            .then(res => {
                toast.success(`${res.data.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    theme: "light",
                });
                refetch()
            })
    }
    return (
        <div className='lg:ml-[300px] flex flex-col items-center w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <IoIosNotifications /> Agreement Requests</h1>
            <ToastContainer></ToastContainer>
            <div className="flex flex-col-reverse w-full justify-center items-center gap-2 mt-3 pb-5">
                {
                    apartmentRequests?.map(request => request?.status === 'pending' && <div className='font-medium w-[400px] bg-black rounded-md border-black  text-white p-4 flex flex-col justify-center items-center mx-5 border gap-1' key={request?._id}>
                        <p className='flex gap-1 justify-center items-center'><IoDocumentText />Agreement Request Date: {request?.requestDate}</p>
                        <div className="flex justify-between w-full">
                            <p className='flex gap-1 justify-center items-center'><FaUserCircle />{request?.name}</p>
                            <p className='flex gap-1 justify-center items-center'><MdEmail />{request?.email}</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <p className='flex gap-1 justify-center items-center'><FaBuildingColumns />Floor: {request?.floor}</p>
                            <p className='flex gap-1 justify-center items-center'><FaBuilding />Block: {request?.block}</p>
                        </div>
                        <div className="flex justify-between w-full">
                            <p className='flex gap-1 justify-center items-center'><SiCodeblocks />Apartment No: {request?.apartmentNo}</p>
                            <p className='flex gap-1 justify-center items-center'><TbCurrencyTaka />Rent: {request?.rent}</p>
                        </div>
                        <div className="flex gap-2 justify-between w-full">
                            <button className='w-full bg-green-400 px-3 py-1 text-green-900 rounded-md' onClick={() => handleAccept(request?._id, request?.email, request?.apartmentId)}>Accept</button>
                            <button className='w-full bg-red-400 px-3 py-1 text-red-900 rounded-md' onClick={() => handleReject(request?._id, request?.apartmentId)}>Reject</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AgreementRequests;