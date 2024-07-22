import React from 'react'
import CompanyCarousel from '../CompanyCarousel/CompanyCarousel'

const CompanyBottomCard = () => {
    return (
        <>
            <div className='w-full md:w-1/3 px-3  mb-[100px]'>
                <div className='w-full md:w-1/3 px-3 mt-12 pb-20 bg-gray-100  mx-auto max-w-[1000px] rounded-[40px]'>
                    <div className='pt-[50px]'>
                        <h1 className='font-bold font-heading text-center text-2xl  text-gray-800  mt-[40px]'>
                            Partnership where Innovation Meets Quality
                        </h1>


                        <p className='font-heading text-center text-lg  text-gray-800  mt-[50px] '>
                            The spark that ignited our journey came from the shared experiences of women around us, <br />women who navigated the complexities of patriarchy while striving to stay true to their identity.
                            <br />We realized that clothing is not just about fabric and design;<br /> it is a powerful tool for self-expression and empowerment.
                        </p>
                        <p className='font-heading text-center text-lg  text-gray-800  mt-[30px] '>
                            Today, our brand stands as a testament to the progress we have made.<br /> We are dedicated to crafting clothing that blends sophistication with comfort, <br />ensuring that every piece resonates with the spirit of the modern woman.<br /> Our collections are designed to inspire confidence, encourage ambition, and celebrate individuality.<br />
                        </p>

                        {/* <CompanyCarousel /> */}

                        <div className='mt-10 flex items-center justify-center'>
                            <img
                                src="https://res.cloudinary.com/du5p1rnil/image/upload/f_auto,q_auto/v1/empressa/ncssvho94hbodcku095o"
                                alt="Empressa"
                                className='h-20 w-20'
                            />
                        </div>


                        <p className='font-heading text-center text-lg  text-gray-800  m-[50px] '>
                            Our brand is a movement to empower women, break free from patriarchy, <br /> and encourage women to pursue their dreams unapologetically.<br /> We aim to create a fostering environment where women thrive like true Empressa.
                        </p>

                        <div className="bg-gray-100">
                            <h1 className='font-bold font-heading text-center text-2xl text-gray-800 m-8'>
                                Our Founders
                            </h1>
                            <div className='flex flex-wrap justify-center items-stretch space-x-10'>
                                <div className="text-center p-6 rounded-lg max-w-sm m-4">
                                    <img src='https://res.cloudinary.com/du5p1rnil/image/upload/f_auto,q_auto/v1/empressa/fkjxlqbieowk84uiag9q' alt='Alpha Code Labs Logo' className='h-44 w-60 mx-auto bg-gray-800 rounded-lg' />
                                </div>
                                <div className="text-center p-6 rounded-lg max-w-sm m-4">
                                    <img src='https://res.cloudinary.com/du5p1rnil/image/upload/f_auto,q_auto/v1/empressa/g4nctbuhkb555mw5otrf' alt='MHK Exports Logo' className='h-44 w-60 mx-auto bg-gray-500 rounded-lg' />
                                </div>
                            </div>
                            <div className='text-center max-w-3xl mx-auto'>
                                <p className='font-heading text-lg text-gray-800 mb-4'>
                                    Founded in partnership between Alpha Code Labs and MHK Exports, our company leverages the strengths and expertise of both partners.
                                </p>
                                <p className='font-heading text-lg text-gray-800'>
                                    MHK Exports ensures our products meet international quality standards, while <br />Alpha Code Labs handles all technical needs seamlessly, ensuring excellence and innovation in everything we do.
                                </p>
                            </div>
                        </div>


                        <div className="bg-gray-100">
                            <h1 className='font-bold font-heading text-center text-2xl text-gray-800 m-10'>
                                Our Designers
                            </h1>
                            <div className='flex flex-wrap justify-center items-stretch space-x-6'>
                                <div className="text-center bg-white shadow-xl p-6 rounded-lg max-w-sm m-4">
                                    <img className='w-40 h-40 mx-auto border-4 border-gray-200' src='' alt='Lalita Batra' />
                                    <p className='font-heading mt-6 text-2xl text-gray-800'>Lalita Batra</p>
                                    <p className='text-gray-600 mt-4 text-sm'>
                                        Lalita Batra is a seasoned designer with over 10 years of experience in graphic and web design.
                                    </p>
                                </div>
                                <div className="text-center bg-white shadow-xl p-6 rounded-lg max-w-sm m-4">
                                    <img className='w-40 h-40 mx-auto border-4 border-gray-200' src='' alt='Bhavya Keshwani' />
                                    <p className='font-heading mt-6 text-2xl text-gray-800'>Bhavya Keswani</p>
                                    <p className='text-gray-600 mt-4 text-sm'>
                                        Bhavya Keswani specializes in user interface design and has a passion for creating intuitive user experiences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyBottomCard