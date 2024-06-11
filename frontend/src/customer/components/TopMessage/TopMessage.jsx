import React from 'react'

const TopMessage = () => {
    return (
        <>
            <div className='w-full md:w-1/3 px-3 md:mb-0'>


                <h1 className='font-ijk text-center text-3xl  text-black  mt-[100px] '>
                    <div className="flex justify-center items-center p-4 ">
                        <p className="p-2 px-4 group"  >
                        Slowly, ethically hand-crafted
                            <div className="bg-amber-500 h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
                        </p>
                    </div>
                   
                </h1>
                <p className='font-ijk text-center text-xl  text-gray-800  mt-[30px] '>
                    We practise slow, handmade fashion. This is the essence of everything at Daughters of India. We release one
                </p>
                <p className='font-ijk text-center text-xl  text-gray-800  mt-[5px] '>
                    product at a time when it is complete. This ensures the artisans are free to manage their own hours without
                </p>
                <p className='font-ijk text-center text-xl  text-gray-800  mt-[5px] '>
                    production deadlines, providing flexibility to enjoy life at a slower pace.
                </p>
            </div>
        </>
    )
}

export default TopMessage