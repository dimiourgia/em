import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SupportBanner = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
        <div className="w-screen mt-14">
            <h1 className="w-full">
            <Link to="/about">
                <img 
                className="w-full h-auto"
                src={isMobile ? "images/27.webp" : "images/26.webp"}
                alt="asd"
                />
                </Link>
                </h1>
            </div>
            <div className='w-full md:w-1/3 px-3 md:mb-0'>
                <p className='font-text text-center text-xl  text-gray-800  mt-[100px] '>
                    We support the art of hand block printing and sustainably handmade garments that utilise tradition and
                </p>
                <p className='font-text text-center text-xl  text-gray-800  mt-[5px] '>
                    ritual through ancient practice. Our aim is to bridge the gap between artisan and consumer, our connection
                </p>
                <p className='font-text text-center text-xl  text-gray-800  mt-[5px] '>
                    with one another, and the Earth.
                </p>
            </div>
        </div>
    )
}
export default SupportBanner;