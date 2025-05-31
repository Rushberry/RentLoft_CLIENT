import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";



const Footer = () => {
    let currentYear = new Date().getFullYear()
    return (
        <div className="mx-auto flex flex-col justify-center items-center w-full bg-white py-[40px]">
            <img src="/assets/Logo.png" alt="Rent Loft" className="w-6/12"/>
            <p className="font-medium text-[16px] text-black w-[75%] text-center mt-3">Your perfect apartment, all in one place — only at Rent Loft.</p>
            <div className="pb-8 border-b border-[#000] w-[75%] flex flex-row flex-wrap text-[30px] justify-center mt-5 cursor-pointer text-black gap-4">
                <a href="https://www.facebook.com/rr.rushberry" target="_blank"><FaFacebook className="hover:text-[#1877F2] duration-300"></FaFacebook></a>
                <a href="https://www.instagram.com/rr_rushberry" target="_blank"><FaInstagram className="hover:bg-gradient-to-r hover:text-pink-500 duration-300"></FaInstagram></a>
                <a href="https://www.github.com/Rushberry" target="_blank"><FaGithub className="hover:text-[#2b3137] duration-300"></FaGithub></a>
                <a href="https://www.linkedin.com/in/md-rafsan-afnan-rushan-a17b06324/" target="_blank"><FaLinkedin className="hover:text-[#0e76a8] duration-300"></FaLinkedin></a>
                <a href="https://www.x.com/rr_rushberry" target="_blank"><FaTwitter className="hover:text-[#1DA1F2] duration-300"></FaTwitter></a>
                <a href="https://www.youtube.com/@rushberry_rr" target="_blank"><FaYoutube className="hover:text-[#FF0000] duration-300"></FaYoutube></a>

            </div>
            <p className="font-medium text-[16px] text-black w-full text-center mt-5">&copy; {currentYear}. All Rights Reserved. </p>
        </div>
    );
};

export default Footer;