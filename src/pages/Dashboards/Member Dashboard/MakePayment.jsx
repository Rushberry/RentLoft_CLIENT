import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillNotification } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import { AuthContext } from '../../../providers/AuthProvider';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
const MakePayment = () => {
    const { user, setRent, setMonth, month } = useContext(AuthContext)
    const [info, setInfo] = useState({})
    const toastShownRef2 = useRef(false);
    const navigate = useNavigate()
    useEffect(()=> {setMonth(new Date().toLocaleString('default', { month: 'long' }))}, [])
    console.log(month)
    const handlePay = e => {
        e.preventDefault()
        setRent(info?.rent)
        navigate('/dashboard/makePayment/payment')
    }
    const handleMonth = e => {
        // console.log(e)
        setMonth(e.target.value)
        console.log(month)
    }

    useEffect(() => {
        const data = { email: user.email };
        axios.post(`${import.meta.env.VITE_serverApiLink}/apartmentRentInfo`, data, { headers: { authorization: localStorage.getItem('access-token') } })
            .then(res => {
                // console.log(res.data)
                setInfo(res.data)
                if (!toastShownRef2.current) {
                    toast.success(`Loaded Details`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        theme: "light",

                    })
                    toastShownRef2.current = true;
                }
            })
    }, [user?.email]);

    return (
        <div className='lg:ml-[300px] flex flex-col items-center w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <FaMoneyCheckDollar /> Make Payment</h1>
            <ToastContainer></ToastContainer>
            <form className='flex flex-col w-[400px] justify-center items-center mt-8 gap-3' onSubmit={handlePay}>
                <h3 className='text-left w-full text-xl font-medium '><span className='w-fit text-white bg-black rounded-md px-2 py-1 '>Email:</span></h3>
                <input type="text" readOnly defaultValue={info?.email} name='title' placeholder='Title' className='disabled w-full px-3 rounded-md border border-black py-3 font-medium text-xl' required />
                <h3 className='text-left w-full text-xl font-medium '><span className='w-fit text-white bg-black rounded-md px-2 py-1 '>Floor:</span></h3>
                <input type="text" readOnly defaultValue={info?.floor} name='title' placeholder='Title' className='disabled w-full px-3 rounded-md border border-black py-3 font-medium text-xl' required />
                <h3 className='text-left w-full text-xl font-medium '><span className='w-fit text-white bg-black rounded-md px-2 py-1 '>Block Name:</span></h3>
                <input type="text" readOnly defaultValue={info?.block} name='title' placeholder='Title' className='disabled w-full px-3 rounded-md border border-black py-3 font-medium text-xl' required />
                <h3 className='text-left w-full text-xl font-medium '><span className='w-fit text-white bg-black rounded-md px-2 py-1 '>Apartment No:</span></h3>
                <input type="text" readOnly defaultValue={info?.apartmentNo} name='title' placeholder='Title' className='disabled w-full px-3 rounded-md border border-black py-3 font-medium text-xl' required />
                <h3 className='text-left w-full text-xl font-medium '><span className='w-fit text-white bg-black rounded-md px-2 py-1 '>Rent:</span></h3>
                <input type="text" readOnly defaultValue={info?.rent} name='title' placeholder='Title' className='disabled w-full px-3 rounded-md border border-black py-3 font-medium text-xl' required />
                <h3 className='text-left w-full text-xl font-medium '><span className='w-fit text-white bg-black rounded-md px-2 py-1 '>Month:</span></h3>
                <select name="month" defaultValue={new Date().toLocaleString('default', { month: 'long' })} className="w-full px-3 cursor-pointer rounded-md border border-black py-2 font-medium text-xl" onChange={handleMonth} required>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                </select>
                <input type="submit" value="Pay" className='text-white mb-10 bg-black w-full rounded-md py-2 text-xl cursor-pointer border border-black font-medium' />
            </form>
        </div>
    )
};

export default MakePayment;