import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import { IoSearch } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaBuildingColumns } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa6";
import { SiCodeblocks } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';





const Apartments = () => {
    const { data: apartments = [], isSuccess } = useQuery({
        queryKey: ['apartments'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_serverApiLink}/apartments`);
            toast.success('Loaded All Apartments', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "light",
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success('Loaded All Apartments', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "light",
            });
        },
    });

    useEffect(() => {
        if (isSuccess) {
            setData(apartments);
        }
        // axios.get(`${import.meta.env.VITE_serverApiLink}/apartmentsPagination?page=${0}&limit=${numberOfDataPerPage}`)
        //     .then(res => setApartmentsPerPage(res.data));
        const paginatedApartments = apartments.slice(
            0 * numberOfDataPerPage,
            0 * numberOfDataPerPage + numberOfDataPerPage
        );
        setApartmentsPerPage(paginatedApartments)
    }, [apartments, isSuccess]);

    const [data, setData] = useState(apartments)
    const [apartmentsPerPage, setApartmentsPerPage] = useState([]);
    const [selectedPage, setSelectedPage] = useState(0)
    const numberOfDataPerPage = 6;
    const pages = Math.ceil(data.length / numberOfDataPerPage)
    const page = [...Array(pages).keys()]

    const handlePrev = () => {
        if (selectedPage > 0) {
            const newPage = selectedPage - 1;
            setSelectedPage(newPage);
            // axios.get(`${import.meta.env.VITE_serverApiLink}/apartmentsPagination?page=${newPage}&limit=${numberOfDataPerPage}`)
            //     .then(res => setApartmentsPerPage(res.data));
            const paginatedApartments = data.slice(
                newPage * numberOfDataPerPage,
                newPage * numberOfDataPerPage + numberOfDataPerPage
            );
            setApartmentsPerPage(paginatedApartments)
        }
    }

    const handleNext = () => {
        if (selectedPage < page.length - 1) {
            const newPage = selectedPage + 1;
            setSelectedPage(newPage);
            // axios.get(`${import.meta.env.VITE_serverApiLink}/apartmentsPagination?page=${newPage}&limit=${numberOfDataPerPage}`)
            //     .then(res => setApartmentsPerPage(res.data));
            const paginatedApartments = data.slice(
                newPage * numberOfDataPerPage,
                newPage * numberOfDataPerPage + numberOfDataPerPage
            );
            setApartmentsPerPage(paginatedApartments)
        }
    }

    const handleRefresh = () => {
        setData(apartments)
    }

    const handleSearchRentRange = e => {
        e.preventDefault()
        const rent = e.target;
        const min = parseInt(rent.min.value);
        const max = parseInt(rent.max.value);
        const data = { min, max }
        axios.post(`${import.meta.env.VITE_serverApiLink}/apartmentPrice`, data)
            .then(res => setData(res.data))
        rent.reset()
        const paginatedApartments = data.slice(
            0 * numberOfDataPerPage,
            0 * numberOfDataPerPage + numberOfDataPerPage
        );
        setApartmentsPerPage(paginatedApartments)
    }


    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const handleAgreement = e => {
        if (user) {
            const data = {
                name: user?.displayName,
                email: user?.email,
                floor: e?.floor,
                block: e?.block,
                apartmentNo: e?.apartmentNo,
                rent: e?.rent,
                status: "pending"

            }
            axios.post(`${import.meta.env.VITE_serverApiLink}/apartmentRent`, data)
                .then(res => {
                    toast.success(`${res.data.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        theme: "light",
                    });
                })

        } else {
            navigate('/login')
        }

    }

    return (
        <div className='flex flex-col -z-20 justify-center items-center pb-10 border-b border-black'>
            <h1 className='lg:text-4xl md:text-3xl text-xl text-left font-medium  mt-7'>Apartments</h1>
            <ToastContainer />
            <div className='w-11/12 flex mt-4 items-center justify-center'>
                <form onSubmit={handleSearchRentRange} className='flex flex-col lg:flex-row gap-2 w-full items-center justify-center'>
                    <div className="flex lg:flex-row flex-col lg:gap-0 gap-2 justify-center items-center">
                        <div className="flex lg:gap-0 gap-1 justify-center items-center"><input required type="number" placeholder='Minimum Rent' name='min' className='px-3 py-2 text-black text-medium border-black rounded-lg border w-10/12' /><TbCurrencyTaka className=' -ml-8 text-2xl' /></div>
                        <div className="flex lg:-ml-3 lg:gap-0 gap-1 justify-center items-center"><input required type="number" placeholder='Maximum Rent' name='max' className='px-3 py-2 text-black text-medium border-black rounded-lg border w-10/12' /><TbCurrencyTaka className=' -ml-8 text-2xl' /></div>
                    </div>
                    <div className="flex gap-3 lg:gap-8 flex-row lg:flex-row">
                        <button type="submit" className='text-white text-xl bg-black p-3 rounded-full'><IoSearch /></button>
                        <button onClick={handleRefresh} className='text-white text-xl bg-black p-3 rounded-full'><LuRefreshCw /></button></div>
                </form>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-11/12 justify-center items-center my-7">
                {
                    apartmentsPerPage?.map((apartment) => <div key={apartment?._id} className='gap-3 rounded-xl justify-start items-center flex lg:h-fit h-fit  flex-col p-3 w-full border border-black'>
                        <img src={apartment?.image} className="w-[345px] h-[175px] rounded-xl object-cover" />
                        <div className="flex justify-between w-full items-center">
                            <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaBuildingColumns />Floor:</span> {apartment?.floor}</h3>
                            <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><FaBuilding />Block:</span> {apartment?.block}</h3>
                        </div>
                        <div className="flex justify-between w-full items-center">
                            <h3 className='text-md flex gap-1 justify-center items-center'><span className='flex gap-1 justify-center items-center font-medium'><SiCodeblocks />Apartment No:</span> {apartment?.apartmentNo}</h3>
                            <h3 className='text-md flex gap-0.5 justify-center items-center'><span className='flex gap-0.5 justify-center items-center font-medium'><TbCurrencyTaka />Rent:</span> {apartment?.rent}</h3>
                        </div>
                        <button onClick={() => { handleAgreement(apartment) }} className='w-full bg-black rounded-lg text-white font-medium hover:bg-white hover:text-black border-black border px-4 py-2'>Apply for Agreement</button>
                    </div>)
                }
            </div>
            <div className="flex items-center justify-center gap-3">
                <button onClick={handlePrev} className="text-white bg-black font-bold rounded-md px-2 text-xl py-2" ><IoIosArrowBack /></button>
                {page?.map(each => <button onClick={() => {
                    setSelectedPage(each);
                    // axios.get(`${import.meta.env.VITE_serverApiLink}/apartmentsPagination?page=${each}&limit=${numberOfDataPerPage}`)
                    //     .then(res => setApartmentsPerPage(res.data));
                    const paginatedApartments = data.slice(
                        each * numberOfDataPerPage,
                        each * numberOfDataPerPage + numberOfDataPerPage
                    );
                    setApartmentsPerPage(paginatedApartments)
                }}
                    key={each} className={`${selectedPage === each ? 'bg-black text-white border-black border' : 'bg-white text-black border-black border'} font-bold px-3 py-1 rounded-md`}>{each + 1}</button>)}
                <button onClick={handleNext} className="text-white bg-black font-bold rounded-md px-2 text-xl py-2" ><IoIosArrowForward /></button>
            </div>
        </div>
    );
};

export default Apartments;