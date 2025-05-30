import React, { useRef } from 'react';
import { AiFillNotification } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
const MakeAnnouncement = () => {
    const toastShownRef = useRef(false);
    const handleAnnounce = e => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const data = { title, description }
        axios.post(`${import.meta.env.VITE_serverApiLink}/announcements`, data)
            .then(res => {
                console.log(res.data)
                if (!toastShownRef.current) {
                    toast.success(`Announcement Done`, {
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
        form.reset()
    }
    return (
        <div className='lg:ml-[300px] flex flex-col items-center w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-9'> <AiFillNotification /> Make Announcement</h1>
            <ToastContainer></ToastContainer>
            <form className='flex flex-col w-[400px] justify-center items-center mt-8 gap-3' onSubmit={handleAnnounce}>
                <input type="text" name='title' placeholder='Title' className='w-full px-3 rounded-md border border-black py-3 font-medium text-xl'  required/>
                <textarea name="description" placeholder="Description" className='w-full px-3 rounded-md border border-black py-3 font-medium text-xl' required></textarea>
                <input type="submit" value="Announce" className='text-white bg-black w-full rounded-md py-2 text-xl cursor-pointer hover:text-black hover:bg-white border border-black font-medium' />
            </form>
        </div>
    );
};

export default MakeAnnouncement;