import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
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
                        src="/src/assets/Flat1.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 2 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/src/assets/Flat2.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 3 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/src/assets/Flat3.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 4 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/src/assets/Flat4.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 5 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/src/assets/Flat5.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
                <div className={`carousel-item ${slider === 6 ? 'block' : 'hidden'} relative w-full`}>
                    <img
                        src="/src/assets/Flat6.png"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <button onClick={() => slideTo(slider - 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronLeft size={18} /></button>
                        <button onClick={() => slideTo(slider + 1)} className="bg-black hover:bg-black p-3 rounded-full text-white shadow-sm border border-black"><FaChevronRight size={18} /></button>
                    </div>
                </div>
            </div>
            {/* Slider Banner Ends Here */}
            {/* About the building */}
            <h1 className='lg:text-4xl md:text-3xl text-xl text-left font-medium  mt-3 '>About the building</h1>
            

        </div>
    );
};

export default Home;