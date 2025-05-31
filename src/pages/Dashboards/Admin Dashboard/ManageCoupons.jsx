import { QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react';
import { BiSolidCoupon } from 'react-icons/bi';
import { IoIosAdd, IoIosAddCircle } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const ManageCoupons = () => {
    const { data: coupons = [], refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_serverApiLink}/coupons`);
            toast.success('Loaded All Coupons', {
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

    const handleActiveCoupon = e => {
        axios.patch(`${import.meta.env.VITE_serverApiLink}/updateCouponActive/${e}`, {},
    {
        headers: {
            authorization: localStorage.getItem('access-token')
        }
    })
            .then(res => {
                // console.log(res.data)
                toast.success(`Coupon Is Available Now`, {
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
    const handleInactiveCoupon = e => {
        axios.patch(`${import.meta.env.VITE_serverApiLink}/updateCouponInactive/${e}`, {}, 
    {
        headers: {
            authorization: localStorage.getItem('access-token')
        }
    })
            .then(res => {
                // console.log(res.data)
                toast.success(`Coupon Is Unavailable Now`, {
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

    const handleAddCoupon = e => {
        e.preventDefault()
        const form = e.target;
        const code = form.couponCode.value;
        const discount = form.discount.value;
        const description = form.description.value;
        const status = "active"
        const data = { description, code, discount, status }
        axios.post(`${import.meta.env.VITE_serverApiLink}/coupons`, data,
    {
        headers: {
            authorization: localStorage.getItem('access-token')
        }
    })
            .then(res => {
                console.log(res.data)
                toast.success(`Added Coupon Successfully`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    theme: "light",
                });
                refetch()
                document.getElementById('addCoupon').close()
            })
        form.reset()
    }
    return (
        <div className='lg:ml-[300px] flex flex-col items-center w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <BiSolidCoupon /> Manage Coupons</h1>
            <ToastContainer></ToastContainer>
            <div className='flex'>
                <button className='text-white flex justify-center items-center bg-black font-medium px-3 mt-4 py-1 rounded-md gap-2' onClick={() => { document.getElementById('addCoupon').showModal() }}> <IoIosAddCircle /> Add Coupon</button>
            </div>
            <dialog id="addCoupon" className="modal">
                <div className="modal-box bg-black border border-white">
                    <h1 className='text-2xl text-center font-medium flex justify-center items-center gap-2 text-white'> <IoIosAddCircle /> Add Coupon</h1>
                    <form className='flex flex-col w-full justify-center items-center mt-2 gap-3' onSubmit={handleAddCoupon}>
                        <input type="text" name='couponCode' placeholder='Coupon Code' className='w-full px-3 rounded-md border border-black py-2 font-medium text-xl' required />
                        <input type="number" name='discount' placeholder='Discount Percentage' className='w-full px-3 rounded-md border border-black py-2 font-medium text-xl' required />
                        <input type="text" name='description' placeholder='Coupon Description' className='w-full px-3 rounded-md border border-black py-2 font-medium text-xl' required />
                        <button type='submit' className="px-3 py-1 w-full rounded-md bg-black border text-white border-white font-medium  hover:bg-white hover:text-black text-xl" >Submit</button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-error px-3 py-1 rounded-md bg-bg-white border w-full border-black text-xl">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="overflow-x-auto overflow-y-auto mt-2 rounded-box border border-black bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-black text-center font-medium'>
                            <th>Sl</th>
                            <th>Coupon Code</th>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupons?.map((coupon, idx) => <tr className='text-center' key={coupon?._id}>
                                <th>{idx + 1}</th>
                                <td>{coupon?.code}</td>
                                <td className='flex justify-center'>{coupon?.status === 'active' ? <p className='text-green-900 bg-green-300  rounded-full px-4 font-medium w-fit mt-2'>Available</p> : <p className='text-red-900 bg-red-300  rounded-full px-4 font-medium w-fit mt-2'>Unavailable</p>}</td>
                                <td>
                                    {
                                        coupon?.status === 'inactive' ? <button className='bg-black text-white px-3 w-full py-1 rounded-md hover:text-black hover:bg-white border border-black' onClick={() => handleActiveCoupon(coupon?._id)}>Make Active</button> : <button onClick={() => handleInactiveCoupon(coupon?._id)} className='bg-black text-white px-3 w-full py-1 rounded-md hover:text-black hover:bg-white border border-black'>Make Inactive</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCoupons;