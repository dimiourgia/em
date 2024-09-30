// import React from 'react';

// const PlaceholderCard = () => {
//   return (
//     <div className="relative ml-0 bg-gray-200 rounded-lg overflow-hidden animate-pulse w-[394px] h-[592px]">
//       <div className="bg-gray-300 h-48"></div>
//       <div className="absolute bg-black/40 pb-4 bottom-0 w-full flex flex-col items-center justify-center">
//         <div className="h-4 bg-gray-400 rounded w-3/4 mt-4 mb-2"></div>
//         <div className="h-8 bg-gray-400 rounded w-1/2"></div>
//       </div>
//     </div>
//   );
// };

// export default PlaceholderCard;


import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PlaceholderCard = () => {
  return (
    // <div className="relative ml-4 bg-gray-50 rounded-lg overflow-hidden w-[394px] h-[592px]">
    //   <Skeleton height={592} width={394} />
    // </div>
    <div className='relative ml-1 sm:ml-4 rounded-lg'>
            <div className="overflow-hidden rounded-lg sm:shadow-lg group">
              <div className='sm:hidden'>
                <Skeleton height={262} width={1365} />
              </div>
              <div className='hidden md:block'>
                <Skeleton height={352} width={1365} />
              </div>
            </div> 
    </div>
  );
};

export default PlaceholderCard;
