import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import { useQuery } from "@tanstack/react-query";
import CopyToClipboard from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import { FaLocationDot } from "react-icons/fa6";



const Home = () => {
    const { data: coupons = [] } = useQuery({
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
    // Banner Slider Functionality:
    const [slider, setSlider] = useState(1)
    const totalSlide = 6
    const slideTo = (slideToView) => {
        if (slideToView < 1) {
            setSlider(totalSlide)
        }
        else if (slideToView > totalSlide) {
            setSlider(1)
        }
        else {
            setSlider(slideToView)
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setSlider((prev) => (prev >= totalSlide ? 1 : prev + 1));
        }, 4000);

        return () => clearTimeout(timer);
    }, [slider]);

    return (
        <div className='flex flex-col -z-20 justify-center items-center pb-10 border-b border-black'>
            <h1 className={` text-center bg-white w-full  lg:text-2xl md:text-2xl text-xl font-space text-black `}>
                <Typewriter
                    words={['Step into Rent Loft.', 'Smart living in one iconic building.', 'Designed for now—tailored for you.']}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
            </h1>
            {/* Slider Banner Starts Here */}
            <div className="carousel  w-11/12 rounded-3xl border border-black" >
                <div className={`carousel-item ${slider === 1 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/assets/Flat1.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 2 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/assets/Flat2.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 3 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/assets/Flat3.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 4 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/assets/Flat4.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 5 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/assets/Flat5.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 6 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/assets/Flat6.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
            </div>
            {/* Slider Banner Ends Here */}
            {/* About the building */}
            <h1 className='lg:text-4xl md:text-3xl text-xl text-left font-medium  mt-7 '>About the building</h1>
            <div className="bg-black p-7 w-11/12 rounded-3xl border border-black mt-4">
                <p className='text-white mb-5'>
                    <span className="font-style text-black bg-white px-2 py-0 rounded">Rent Loft</span>  is a <span className="font-style text-black bg-white px-2 py-0 rounded">modern</span> residential building designed for <span className="font-style text-black bg-white px-2 py-0 rounded">comfort</span> and convenience. With <span className="font-style text-black bg-white px-2 py-0 rounded">smart</span> features, secure access, and stylish spaces, it’s the perfect place for professionals, students, and small families. Located in a <span className="font-style text-black bg-white px-2 py-0 rounded">prime</span> area with all essentials nearby, Rent Loft brings you smart <span className="font-style text-black bg-white px-2 py-0 rounded">living</span> in the heart of the city.
                </p>
                <img src="/assets/building.jpg" alt="Rent Loft Building" className='rounded-2xl' />
            </div>
            {/* Special Offers */}
            <ToastContainer></ToastContainer>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-left font-medium  mt-4 '>Special Offers</h1>
            <div className='w-11/12 mt-4 flex justify-center items-center flex-wrap gap-4'>
                {
                    coupons?.map((coupon) =>
                        <div key={coupon?._id} className="relative w-full max-w-md bg-gradient-to-r from-gray-900 to-black text-white rounded-[1.5rem] px-6 py-4 shadow-lg flex justify-between items-center">
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full z-10"></div>
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full z-10"></div>
                            <div>
                                <p className="text-3xl font-bold">{coupon?.discount}% OFF</p>
                                <p className="text-lg mt-2">{coupon?.description}</p>
                                {
                                    coupon?.status == "active" ? <p className='text-green-900 bg-green-300  rounded-full px-4 font-medium w-fit mt-2'>Available</p> : <p className='text-red-900 bg-red-300  rounded-full px-4 font-medium w-fit mt-2'>Unavailable</p>
                                }
                            </div>

                            <div className="text-right flex flex-col justify-between items-end gap-4">
                                <p className="text-2xl font-bold text-green-400">{coupon?.code}</p>
                                {
                                    coupon?.status == "active" && <CopyToClipboard className="text-black w-fit  bg-white px-3 py-2 rounded cursor-pointer border-white border hover:text-white hover:bg-black active:bg-green-300 active:text-green-900 font-medium" text={coupon?.code} >
                                        <span>Copy Code</span>
                                    </CopyToClipboard>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            {/* Apartment’s Location */}
            <h1 className='lg:text-4xl md:text-3xl text-xl text-left font-medium  mt-7 '>Apartment’s Location</h1>
            <div className="bg-black p-7 w-11/12 rounded-3xl items-center border border-black mt-4">
                <p className='text-white mb-5 text-xl w-full font-medium flex gap-2 items-center justify-center'>
                    <FaLocationDot /> Awal Centre, Banani, Dhaka
                </p>
                <div className="mapouter h-[400px]" >
                    <div className="gmap_canvas h-full" >
                        <iframe className='w-full rounded-3xl h-full' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?q=Awal%20Centre%2C%20Banani%2C%20Dhaka&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                    </div>
                    <a href="https://norsumediagroup.com/embed-google-map-website-free" target="_blank" rel="noopener noreferrer" className="gme-generated-link">Embed Map on Website for Free</a>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;