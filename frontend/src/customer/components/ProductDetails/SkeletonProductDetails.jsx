import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonProductDetails = () => {
  return (
    <div className="bg-white pt-6">
      <div className="md:flex justify-center">
        {/* Image gallery skeleton */}
        <div className="mx-4 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <Skeleton height={400} />
          <div className="flex justify-between px-1 mt-2 w-full">
            <Skeleton width={80} height={80}/>
            <Skeleton width={80} height={80}/>
            <Skeleton width={80} height={80}/>
            <Skeleton width={80} height={80}/>
          </div>
        </div>

        {/* Product details skeleton */}
        <div className="mx-5 m-1 p-5 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white">
          <Skeleton height={30} width="70%" />
          <Skeleton height={20} width="50%" className="mt-2" />

          {/* Options skeleton */}
          <div className="mt-4 md:0">
            <Skeleton height={20} width="30%" />
            <Skeleton height={20} width="40%" className="mt-2" />
            <div className="flex flex-wrap gap-4  mt-4">
              <Skeleton height={35} width={35}/>
              <Skeleton height={35} width={35}/>
              <Skeleton height={35} width={35}/>
              <Skeleton height={35} width={35}/>
              <Skeleton height={35} width={35}/>
              <Skeleton height={35} width={35}/>
              <Skeleton height={35} width={35}/>
              <Skeleton height={35} width={35}/>
            </div>
          </div>

          {/* Highlights skeleton */}
          <div className="p-3 mt-4 font-roboto opacity-70">
            <Skeleton height={20} width="50%" />
            <div className="grid grid-cols-2 mt-2">
              <Skeleton height={20} width="40%" />
              <Skeleton height={20} width="60%" />
              <Skeleton height={20} width="40%" />
              <Skeleton height={20} width="60%" />
              <Skeleton height={20} width="40%" />
              <Skeleton height={20} width="60%" />
            </div>
          </div>

          {/* Button skeleton */}
          <Skeleton height={40} width="100%" className="mt-6" />
        </div>
      </div>

      {/* Description skeleton */}
      <div className="m-3 p-4 pb-16 bg-gray-50">
        <Skeleton height={30} width="30%" />
        <Skeleton height={20} width="80%" className="mt-2" count={3} />
        <Skeleton height={30} width="30%" className="mt-6" />
        <Skeleton height={20} width="80%" className="mt-2" count={3} />
      </div>
    </div>
  );
};

export default SkeletonProductDetails;
