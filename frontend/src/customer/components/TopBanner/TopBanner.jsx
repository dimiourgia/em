import React from 'react'
import { Link } from 'react-router-dom'



const TopBanner = () => {
    return (
        <>

            <div >
                <h1 className=' sm:hidden' >
                    <Link to="/products">
                        <img
                            // className="object-cover object-top w-full h-full"
                            src="images/22.webp"
                            alt="asd"
                        />
                    </Link>
                </h1>


                <h1 className='hidden sm:block ' >
                <Link to="/products">
                    <img
                        // className="object-cover object-top w-full h-full"
                        src="images/21.webp"
                        alt="asd"
                    />
                    </Link>
                </h1>


            </div>
        </>

    )
}

export default TopBanner