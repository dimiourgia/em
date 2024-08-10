import React from 'react';

const ErrorComponent = ({ errorMessage = "Something went wrong" }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src='/images/fetchError.jpg' alt="Error" className="w-48 h-48 mb-4" />
      <p className="text-xl text-red-600">{errorMessage}</p>
      <p className="text-lg text-gray-600">Please try again later.</p>
    </div>
  );
};

export default ErrorComponent;
