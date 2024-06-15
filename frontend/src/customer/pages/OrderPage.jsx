import React from 'react'

const OrderPage = () => {

    return (
        <>
            <div className='min-h-screen mx-auto  max-w-[1000px] mt-[20px]'>

                <div className='mx-auto w-full md:w-1/3 px-3 md:mb-0  max-w-[1000px] tracking-widest font-light text-black  text-2xl  font-abc'>
                    Order History
                </div>


                <div className=" hover:shadow-2xl  mt-[50px] mb-[50px] border border-gray-200 rounded m-[10px] ">
                    <div className=' pt-[30px] pb-[30px] mx-auto w-full md:w-1/3 px-3 md:mb-0'>
                        <div className="grid gap-4 sm:grid-cols-12">
                            <div className="min-h-[100px] col-span-2">
                                <img src="images/67.png" alt="asd" />
                            </div>
                            <div className="min-h-[100px]  col-span-5">
                                <h1 className='tracking-widest font-abc font-bold text-base '>
                                    Title
                                </h1>
                                <p className='font-abc'>
                                    Kyra Mini Dress ~ Apricot Blush
                                </p>
                            </div>
                            <div className="min-h-[100px]  col-span-1">
                                <h1 className='tracking-widest font-abc font-bold text-base '>
                                    Price
                                </h1>
                                <p className='font-abc'>
                                    ₹50000
                                </p>
                            </div>
                            <div className="min-h-[100px] col-span-2">
                                <h1 className='tracking-widest font-abc font-bold text-base '>
                                    Order Date
                                </h1>
                                <p className='font-abc'>
                                    17/08/2024
                                </p>
                            </div>
                            <div className="min-h-[100px]  col-span-2">
                                <h1 className='tracking-widest font-abc font-bold text-base '>
                                    Order No
                                </h1>
                                <p className='text-blue-800 font-abc font-bold'>
                                    #8008580085
                                </p>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

        </>

    )
}

export default OrderPage