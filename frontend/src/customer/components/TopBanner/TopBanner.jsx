import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopBanner.css';

const TopBanner = () => {
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
        <div className="relative w-screen h-[calc(100vh-150px)]">
            <h1 className="w-full">
                <Link to="/products">
                    {/* <img
                        className="w-full h-auto"
                        src={isMobile ? "images/22.webp" : "images/21.webp"}
                        alt="asd"
                    /> */}
                    <div id="images" class="group">
                        <img class="image" src="images/dalle1.png"/>
                        <img class="image" src="images/y.jpg"/>
                        <img class="image" src="images/u.jpg"/>
                    </div>
                </Link>
            </h1>
            {/* <div className='h-12 bg-gradient-to-b from-gray-800 to-white w-full absolute -bottom-[166px]'></div> */}
            <img src={'./images/transparent_grayscale_logo.png'} className='absolute top-[225px] left-[38px] h-[400px] w-[400px] -z-[1]' />
            
        </div>
    );
};

export default TopBanner;
