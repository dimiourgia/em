import React from "react";
// import { useDispatch } from "react-redux";
// import { filterProducts } from "../../../State/Product/Action";


export default function SearchBar() {
  return (
    <div>
    <form className="mx-auto w-max">
      <div className="relative">
        <img
          src="https://res.cloudinary.com/du5p1rnil/image/upload/v1713751837/empressa/searchLogo.png"
          alt="Search Icon"
          className="absolute h-5 w-5 top-2 left-3"
        />
        <input
          type="search"
          placeholder="Search"
          className="h-9 w-45 rounded-full pl-10"
        />
      </div>
    </form>
    </div>
  );
}
