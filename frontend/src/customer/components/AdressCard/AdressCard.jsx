import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div className="p-2 font-sans">
      <div className="space-y-1">

        <span className="font-semibold">Name: </span><span>{`${address?.firstName} ${address?.lastName}`}</span>
        </div>
        <div>
        <span className="font-semibold">Shipping Address: </span><span>{`${address?.houseNumber}, ${address?.streetAddress}, ${address?.city}, ${address?.state} ${address?.zipCode}`}</span>
        <div className="space-y-1">
          <span className="font-semibold">Phone No. </span><span>{address?.mobile}</span>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
