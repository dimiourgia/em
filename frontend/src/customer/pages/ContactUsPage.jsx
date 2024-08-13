import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ContactUsPage = () => {
    return (
        <>
            <div className='h-[calc(100vh-60px)] w-full px-3 py-4 flex items-center justify-center'>
                <div className='flex items-center bg-[#faf8f1]  mx-auto max-w-[1000px] rounded-[40px] h-full'>
                    <div className=''>
                        <h1 className='tracking-widest font-light text-2xl text-center'>
                            IN CONNECTION WITH US
                        </h1>
                        <h1 className='text-black text-5xl text-center'>
                            Contact Us
                        </h1>

                        <p className='font-ijk text-center text-lg  text-black  mt-[30px] font-bold'>
                            email: <spna className="text-lg  text-gray-800">empressafashion@empressafashion.com</spna>
                        </p>

                      
                        <div className="flex justify-center items-center mt-[50px]">
                            <button onClick={() => window.location.href = "https://www.instagram.com/empressa.fashion/"}
                                className="bg-white flex text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center items-center rounded-full outline-none focus:outline-none mr-2"
                                type="button">
                                <InstagramIcon className='text-[#f3a87a]' />
                            </button>
                            {/* <button
                                className="bg-white flex text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center items-center rounded-full outline-none focus:outline-none mr-2"
                                type="button">
                                
                                <EmailIcon className='text-blue-400' />


                            </button>
                            <button
                                className="bg-white flex text-green-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                                type="button"
                            >
                                
                                <WhatsAppIcon />
                            </button> */}
                            
                        </div>

                        <div className='mt-[50px] '>
                            <img
                                src="images/59.avif"
                                alt="asd"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUsPage