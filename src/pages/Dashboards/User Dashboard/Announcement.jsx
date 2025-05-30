import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaInbox } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';

const Announcement = () => {
    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_serverApiLink}/announcements`);
            toast.success('Loaded All Announcements', {
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
    return (
        <div className='lg:ml-[200px] w-full min-h-screen px-4 py-6 bg-white'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-center font-medium flex justify-center items-center gap-2 mt-7'> <FaInbox /> Announcements</h1>
            <ToastContainer></ToastContainer>
            <div className="flex flex-col-reverse gap-2 mt-3 pb-5">
                {
                    announcements?.map(announcement => <div className='hover:bg-white bg-black rounded-md border-black hover:text-black text-white p-4 flex flex-col justify-center items-center mx-5 border' key={announcement?._id}>
                        <h3 className='text-xl font-medium'>{announcement?.title}</h3>
                        <p>{announcement?.description}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Announcement;