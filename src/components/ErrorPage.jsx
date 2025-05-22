import React from 'react';
import { GoHomeFill } from 'react-icons/go';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="h-screen w-full bg-[url('/src/assets/error.gif')] bg-cover bg-no-repeat relative bg-bottom">
            <h1 className="text-white text-center pt-10 text-5xl font-space font-extrabold">Page Not Found</h1>
            <Link to={'/'} className=" flex gap-1 items-center absolute bottom-5 right-5 text-black font-medium rounded-lg font-space bg-white px-2 py-1"> <GoHomeFill /> Back to Home</Link>
        </div>
    );
};

export default ErrorPage;