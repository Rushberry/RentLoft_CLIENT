import { QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';
import { BiSolidCoupon } from 'react-icons/bi';
import { IoIosAdd, IoIosAddCircle } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { FaCircleUser } from 'react-icons/fa6';
import { IoPersonRemove } from 'react-icons/io5';

const ManageMembers = () => {
    const { data: members = [], refetch } = useQuery({
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

    const handleRemove = e => {
        const data = { email: e }
        axios.patch(`${import.meta.env.VITE_serverApiLink}/degradeMember`, data, {headers: {authorization: localStorage.getItem('access-token')}})
            .then(res => {
                // console.log(res.data)
                toast.success(`Removed Member`, {
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
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <FaCircleUser /> Manage Members</h1>
            <ToastContainer></ToastContainer>

            <div className="overflow-x-auto overflow-y-auto mt-8 rounded-box border border-black bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-black text-center font-medium'>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            members?.map((member, idx) => <tr className='text-center' key={member?._id}>
                                <th>{idx + 1}</th>
                                <th>{member?.name}</th>
                                <td>{member?.email}</td>
                                <td><button className='bg-red-400 hover:bg-red-500 text-red-950 font-medium px-3 py-1 rounded-md flex justify-center items-center gap-1' onClick={() => handleRemove(member?.email)}><span className='lg:flex hidden'>Remove</span> <IoPersonRemove /></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMembers;