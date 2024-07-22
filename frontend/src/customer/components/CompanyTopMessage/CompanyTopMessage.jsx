import React from 'react'

const CompanyTopMessage = () => {
    return (
        <>
            <div className='w-full md:w-1/3 px-3 md:mb-0  mx-auto max-w-[1000px]'>
        
                <div className='mt-[80px] flex items-center justify-center'>
                    <img
                        src="https://res.cloudinary.com/du5p1rnil/image/upload/f_auto,q_auto/v1/empressa/trlajilv4tdjxco53foy"
                        alt="put an small icon here related to my empressa"
                        className='h-20 w-20'
                    />
                </div>

                <p className='font-text text-center text-4xl  text-black mt-[50px] '>
                                Our Story                     
                </p>
                <p className='italic  text-center text-2xl  text-gray-800  mt-[5px] '>
                "Be Bold, Be You, Be Unstoppable"
                </p>
                <p className='font-heading text-center text-lg text-gray-800 mt-[30px]'>
                Founded with a vision to dismantle the constraints of patriarchy and empower women, our fashion brand emerged as a beacon of change. Our journey began with the belief that fashion is not just clothing but a means of self-expression and liberation. We saw the need for a brand that celebrates women's beauty and strength while supporting their dreams and ambitions.
                </p>

                <p className='font-heading text-center text-lg  text-gray-800  mt-[30px] '>
                Inspired by countless stories of women who have defied societal norms and expectations, we sought to create a platform that showcases fashion as a testament to their resilience and spirit. We are committed to offering fashion that empowers women to be confident and bold.
                </p>
            </div>
        </>
    )
}

export default CompanyTopMessage