import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <div className="w-screen">
            <h1 className="w-full">
                <Link to="/products">
                    <img
                        className="w-full h-auto"
                        src={isMobile ? "images/22.webp" : "images/21.webp"}
                        alt="asd"
                    />
                </Link>
            </h1>
        </div>
    );
};

export default TopBanner;
