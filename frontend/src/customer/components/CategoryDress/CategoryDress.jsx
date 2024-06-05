import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CategoryDress = () => {
    const navigate =useNavigate();
    return (
        <>
            <div className='grid gap-5 mt-[100px] ml-[50px] mr-[50px] sm:grid-cols-3'>
                {/* 1 */}
                <div className=''>
                    <Link to="/products">
                        <img
                            src="images/23.webp"
                            alt="asd"
                        />
                    </Link>
                    <h1 className='font-ijk text-center text-2xl  text-gray-800  mt-[10px] '>
                        Mini Dresses
                    </h1>
                    <h1 className='text-center mt-[10px]'>
                        <button onClick={() => navigate("/products")} class="bg-white tracking-widest font-ijk hover:bg-gray-100 text-gray-800  py-2 px-4 border border-gray-400 ">
                            SHOP MINIS
                        </button>
                    </h1>

                </div>
                {/* 2 */}
                <div className=''>
                    <Link to="/products">
                        <img
                            src="images/24.webp"
                            alt="asd"
                        />
                    </Link>
                    <h1 className='font-ijk text-center text-2xl  text-gray-800  mt-[10px] '>
                        Midi  Dresses
                    </h1>
                    <h1 className='text-center mt-[10px]'>
                        <button onClick={() => navigate("/products")} class="bg-white tracking-widest font-ijk hover:bg-gray-100 text-gray-800  py-2 px-4 border border-gray-400 ">
                            SHOP MIDIS
                        </button>
                    </h1>
                </div>
                {/* 3 */}
                <div className=''>
                    <Link to="/products">
                        <img
                            src="images/25.webp"
                            alt="asd"
                        />
                    </Link>
                    <h1 className='font-ijk text-center text-2xl  text-gray-800  mt-[10px] '>
                        Maxi  Dresses
                    </h1>
                    <h1 className='text-center mt-[10px]'>
                        <button onClick={() => navigate("/products")} class="bg-white tracking-widest font-ijk hover:bg-gray-100 text-gray-800  py-2 px-4 border border-gray-400 ">
                            SHOP MAXIS
                        </button>
                    </h1>
                </div>

            </div>
        </>

    )
}

export default CategoryDress