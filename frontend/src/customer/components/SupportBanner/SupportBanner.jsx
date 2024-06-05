import React from 'react'
import { Link } from 'react-router-dom'

const SupportBanner = () => {
    return (
        <div className='mt-[100px]'>
            <div className=' sm:hidden'>
            <Link to="/about">

                <img

                    src="images/27.webp"
                    alt="asd"
                />
                </Link>
            </div>


            <div className='hidden sm:block '>
            <Link to="/about">
                <img

                    src="images/26.webp"
                    alt="asd"
                />
                </Link>
            </div>
            <div className='w-full md:w-1/3 px-3 md:mb-0'>
                <p className='font-ijk text-center text-xl  text-gray-800  mt-[100px] '>
                    We support the art of hand block printing and sustainably handmade garments that utilise tradition and
                </p>
                <p className='font-ijk text-center text-xl  text-gray-800  mt-[5px] '>
                    ritual through ancient practice. Our aim is to bridge the gap between artisan and consumer, our connection
                </p>
                <p className='font-ijk text-center text-xl  text-gray-800  mt-[5px] '>
                    with one another, and the Earth.
                </p>
            </div>

        </div>
    )
}

export default SupportBanner