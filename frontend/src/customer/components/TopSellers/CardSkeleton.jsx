import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PlaceholderCard = () => {
  return (
    <div className="relative ml-4 bg-gray-50 rounded-lg overflow-hidden w-fit h-fit">
      <Skeleton height={592} width={394} />
    </div>
  );
};

export default PlaceholderCard;
