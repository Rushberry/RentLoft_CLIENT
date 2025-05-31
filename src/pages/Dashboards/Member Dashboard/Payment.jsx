import React, { useContext } from 'react';
import { FaCcStripe } from 'react-icons/fa6';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../providers/AuthProvider';
import { TbCurrencyTaka } from 'react-icons/tb';

const Payment = () => {
    const {rent, setRent, month} = useContext(AuthContext)
    const handleApplyCoupon = e => {
        e.preventDefault()
        const coupon = e.target.couponCode.value;
        const data = {code: coupon}
        console.log(data)
        e.target.reset()
    }
    return (
        <div className='lg:ml-[300px] flex flex-col items-center w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <FaCcStripe /> Pay Rent: {month}</h1>
            <ToastContainer></ToastContainer>
            <h3 className='text-center flex justify-center text-white mt-4 w-full text-xl font-medium '><span className='w-fit text-white flex gap-1 justify-center items-center bg-black rounded-md px-2 py-1 '>Rent Amount: {rent}<TbCurrencyTaka></TbCurrencyTaka></span></h3>
            <form className='flex flex-row w-[400px] justify-center items-center mt-4 gap-3' onSubmit={handleApplyCoupon}>
                <input type="text" name='couponCode' placeholder='Enter Coupon' className='disabled w-full px-3 rounded-md border border-black py-2 font-medium text-xl' required />
                <input type="submit" value="Apply Coupon" className='text-white bg-black w-full rounded-md py-2 text-xl cursor-pointer border border-black font-medium' />
            </form>
        </div>
    );
};

export default Payment;