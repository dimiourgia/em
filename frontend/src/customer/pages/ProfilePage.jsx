import React from 'react'
// import { getUser } from ""

// import { useSelector } from 'react-redux'

// const auth  = useSelector((state)=>state.auth)



const ProfilePage = () => {
    return (
        <>
            <div className='mx-auto container mt-[100px]'>
                {/* PERSONAL INFO */}
                <div>
                    <div className='mx-auto w-full md:w-1/3 px-3 md:mb-0  max-w-[520px] tracking-widest font-light text-black  text-2xl  font-abc'>PERSONAL INFO</div>
                    <div className='mx-auto  max-w-[520px] mt-[20px]'>

                        <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="Firstname">
                                First name
                            </label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Firstname" type="text" placeholder="First name" />
                        </div>

                        <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="Lastname">
                                Last name
                            </label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Lastname" type="text" placeholder="Last name" />
                        </div>

                        <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
                            <label for="email" className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">Email address</label>
                            <input type="email" id="email" className=" shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="john.doe@company.com" required />
                        </div>
                        <div className="mb-4 w-full md:w-1/3 px-3 md:mb-0">
                            <button type="button" className=" text-white hover:bg-gray-800 bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">SAVE</button>
                        </div>

                    </div>
                </div>

                {/* ADD ADDRESS */}
                <div className='mt-[30px]'>
                    <div className='w-full md:w-1/3 px-3 md:mb-0 mx-auto  max-w-[520px] tracking-widest font-light text-black  text-2xl  font-abc'>ADD ADDRESS</div>
                    <div className='mx-auto  max-w-[520px] mt-[20px]'>

                        <div className="mb-4 w-full md:w-1/3 px-3  md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="Firstname">
                                First name
                            </label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Firstname" type="text" placeholder="First name" />
                        </div>

                        <div className="mb-4 w-full md:w-1/3 px-3  md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="Lastname">
                                Last name
                            </label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Lastname" type="text" placeholder="Last name" />
                        </div>

                        <div className="mb-4 w-full md:w-1/3 px-3  md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="Address">
                                Address
                            </label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Address" type="text" placeholder="Address" />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-city">
                                Apartment
                            </label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-city" type="text" placeholder="Apartment, suite, etc. (optional)" />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-city">
                                City
                            </label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-city" type="text" placeholder="Albuquerque" />
                        </div>



                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-city">
                                Zip code
                            </label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-city" type="tel" placeholder="Apartment, suite, etc. (optional)" />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block  tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-city">
                                Phone
                            </label>
                            <input className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-city" type="tel" placeholder="Phone (optional)" />
                        </div>


                        <div className="w-full md:w-1/3 px-3 md:mb-0 mb-4">
                            <button type="button" className=" text-white hover:bg-gray-800 bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add address</button>
                        </div>

                    </div>
                </div>


            </div>

        </>
    )
}

export default ProfilePage