import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopBanner.css';
import AliceCarousel from 'react-alice-carousel';
import './Carousel.css';

const TopBanner = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageNames = ['g3.png', '1.jpg', '2.jpg'];


    return (
        <AliceCarousel
            autoPlay={true}
            autoPlayStrategy='none'
            infinite
            disableButtonsControls
            autoPlayInterval={3000}
            items={imageNames.map(imageName=><img src={`images/${imageName}`} className='absollute left-0 w-[100vw]' />)}
        />
    );
};

export default TopBanner;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './TopBanner.css';

// const TopBanner = () => {
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//     const handleResize = () => {
//         setIsMobile(window.innerWidth <= 768);
//     };

//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return (
//         <div className="relative w-[100vw] h-[100vh] bg-[#f1f1f1]">
//             {/* <h1 className="w-full">
//                 <Link to="/products">
//                     <div id="images" class="group">
//                         <img class="image" src="images/dalle1.png"/>
//                         <img class="image" src="images/y.jpg"/>
//                         <img class="image" src="images/u.jpg"/>
//                     </div>
//                 </Link> */}
//             {/* <div className='h-12 bg-gradient-to-b from-gray-800 to-white w-full absolute -bottom-[166px]'></div> */}
//             {/* <img src={'./images/transparent_grayscale_logo.png'} className='absolute top-[225px] left-[38px] h-[400px] w-[400px] -z-[1]' /> */}
//             <p className='text-black text-[118px]'></p>
//             <img src='images/g1.png' className='-mt-[90px] -ml-[290px]'/>
//             <div className='absolute top-[375px] left-[948px]'>
//                 <p className='text-[#83a7a7] text-[90px] font-fantasy font-bold'>Bold</p>
//             </div>
//             <div className='absolute top-[475px] left-[948px]'>
//                 <p className='text-[#83a7a7] text-[90px] font-fantasy font-bold'>Strong</p>
//             </div>
//             <div className='absolute top-[575px] left-[948px]'>
//                 <p className='text-[#83a7a7] text-[90px] font-fantasy font-bold'>Unstoppable</p>
//             </div>
//         </div>
//     );
// };

// export default TopBanner;
