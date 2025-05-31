import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaCcStripe } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../providers/AuthProvider';
import { TbCurrencyTaka } from 'react-icons/tb';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const { rent, setRent, month } = useContext(AuthContext)
    const [applied, setApplied] = useState(false)
    const navigate = useNavigate()
    // console.log(rent)
    useEffect(() => {
        if (rent == null) {
            navigate('/dashboard/makePayment')
        }
    }, [rent])
    // const toastShownRef = useRef(false);
    const handleApplyCoupon = e => {
        e.preventDefault()
        const coupon = e.target.couponCode.value;
        const data = { code: coupon }
        axios.post(`${import.meta.env.VITE_serverApiLink}/checkCoupon`, data, { headers: { authorization: localStorage.getItem('access-token') } })
            .then(res => {
                // console.log(res.data)
                toast.success(`${res.data.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    theme: "light",
                });
                if (res.data?.discount) {
                    const discount = res?.data?.discount;
                    const discountedRent = rent - (rent * discount / 100);
                    setRent(discountedRent);
                    setApplied(true)
                }
                e.target.reset()
            })
    }

    const stripePromise = loadStripe(import.meta.env.VITE_paymentApiKey);
    return (
        <div className='lg:ml-[300px] flex flex-col items-center w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <FaCcStripe /> Pay Rent: {month}</h1>
            <ToastContainer></ToastContainer>
            <h3 className='text-center flex justify-center text-white mt-4 w-full text-xl font-medium '><span className='w-fit text-white flex gap-1 justify-center items-center bg-black rounded-md px-2 py-1 '>Rent Amount: {rent}<TbCurrencyTaka></TbCurrencyTaka></span></h3>
            <form className={`flex flex-row w-[400px] justify-center items-center mt-4 gap-3 ${applied ? 'pointer-events-none opacity-50' : ''}}`} onSubmit={handleApplyCoupon}>
                <input type="text" name='couponCode' placeholder='Enter Coupon' className='disabled w-full px-3 rounded-md border border-black py-2 font-medium text-xl' required />
                <input type="submit" value="Apply Coupon" className={`text-white bg-black w-full rounded-md py-2 text-xl cursor-pointer border border-black font-medium ${applied ? 'pointer-events-none opacity-50' : ''}`} />
            </form>
            <div className="mt-6">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;