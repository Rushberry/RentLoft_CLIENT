import { QueryClient, useQuery } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react';
import { BiSolidCoupon } from 'react-icons/bi';
import { IoIosAdd, IoIosAddCircle } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { FaCircleUser } from 'react-icons/fa6';
import { IoPersonRemove } from 'react-icons/io5';
import { AuthContext } from '../../../providers/AuthProvider';
import { RiSecurePaymentFill } from 'react-icons/ri';

const PaymentHistory = () => {
    const toastShownRef = useRef(false);
    const [history, setHistory] = useState([])
    const { user } = useContext(AuthContext)
    const data = { email: user?.email }
    axios.post(`${import.meta.env.VITE_serverApiLink}/paymentHistory`, data, { headers: { authorization: localStorage.getItem('access-token') } })
        .then(res => {
            setHistory(res.data)
            if (!toastShownRef.current) {
                toast.success(`Loaded Payment History`, {
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

    return (
        <div className='lg:ml-[300px] flex flex-col items-center w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <RiSecurePaymentFill /> Payment History</h1>
            <ToastContainer></ToastContainer>

            <div className="overflow-x-auto overflow-y-auto mt-8 rounded-box border border-black bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-black text-center font-medium'>
                            <th>Month</th>
                            <th>Rent Paid</th>
                            <th>Transaction ID</th>
                            <th>Date Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history?.map((payment) => <tr className='text-center' key={payment?._id}>
                                <th>{payment?.rentMonth}</th>
                                <th>{payment?.rentAmount} BDT</th>
                                <th >
                                    <p className='bg-gray-300 px-2 py-1 text-gray-600 rounded-md'>
                                        {payment?.transactionId ? `${payment.transactionId.slice(0, 6)}...${payment.transactionId.slice(-4)}` : ''}
                                    </p>
                                </th>
                                <th>{payment?.paymentDate}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;