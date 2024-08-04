export default function({title, content, imageSrc }){


    return(
        <div className='w-full px-3  mb-[100px]'>
                <div className='w-full px-3  mt-[30px]  bg-[#faf8f1]  mx-auto max-w-[1000px] rounded-[40px]'>
                    <div className='pt-[50px]'>
                        <h1 className='text-black text-5xl text-center'>
                            {title}
                        </h1>
                        <p className='font-ijk text-justify text-lg  text-gray-800  mt-[50px] '>
                            {content}
                        </p>
                      
                        <div className='mt-[50px] flex w-full item-center justify-center'>
                            <img
                                src={imageSrc}
                                alt={title}
                            />
                        </div>

                        <div className='mt-[50px] rounded-b-[40px]'>
                            <img
                                className="rounded-b-[40px]"
                                src="images/59.avif"
                                alt="asd"
                            />
                        </div>

                    </div>
                </div>
            </div>
    )
}