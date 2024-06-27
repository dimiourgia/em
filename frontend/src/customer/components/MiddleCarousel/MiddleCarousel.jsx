import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const items = [
    // 1
    <div className="item hover:shadow-2xl  mt-[100px] mb-[30px] border border-gray-200 rounded m-[10px] " data-value="1">
        <img
            src="images/35.webp"
            alt="asd"
        />
        <p className='text-center mt-[50px] tracking-widest font-ijk'>
            KYRA MINI DRESS ~ CORAL
        </p>
        <div className='text-center text-xs mt-[20px] mb-[20px]'>
            <span className='font-ijk line-through'>Rs. 11,800.00 &nbsp;</span>
            <span className='font-ijk'>&nbsp;Rs. 8,800.00 &nbsp;</span>
            <span className='font-ijk text-[#cc2a2a]'>
                Save 25%
            </span>
        </div>

    </div>,
    // 2
    <div className="item hover:shadow-2xl  mt-[100px] mb-[30px] border border-gray-200 rounded m-[10px] " data-value="2">
        <img

            src="images/36.webp"
            alt="asd"
        />
        <p className='text-center mt-[50px] tracking-widest font-ijk'>
            KYRA MINI DRESS ~ CORAL
        </p>
        <div className='text-center text-xs mt-[20px] mb-[20px]'>
            <span className='font-ijk line-through'>Rs. 11,800.00 &nbsp;</span>
            <span className='font-ijk'>&nbsp;Rs. 8,800.00 &nbsp;</span>
            <span className='font-ijk text-[#cc2a2a]'>
                Save 25%
            </span>
        </div>

    </div>,
    // 3
    <div className="item hover:shadow-2xl  mt-[100px] mb-[30px] border border-gray-200 rounded m-[10px] " data-value="3">
        <img

            src="images/37.jpg"
            alt="asd"
        />
        <p className='text-center mt-[50px] tracking-widest font-ijk'>
            KYRA MINI DRESS ~ CORAL
        </p>
        <div className='text-center text-xs mt-[20px] mb-[20px]'>
            <span className='font-ijk line-through'>Rs. 11,800.00 &nbsp;</span>
            <span className='font-ijk'>&nbsp;Rs. 8,800.00 &nbsp;</span>
            <span className='font-ijk text-[#cc2a2a]'>
                Save 25%
            </span>
        </div>

    </div>,
   
];

const MiddleCarousel = () => (
    <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
        infinite
    />
);

export default MiddleCarousel;
