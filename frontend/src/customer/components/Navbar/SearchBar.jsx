import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({search, setSearch}) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <form className="mx-auto w-max">
        <div className="relative">
          <img
            src="https://res.cloudinary.com/du5p1rnil/image/upload/v1713751837/empressa/searchLogo.png"
            alt="Search icon"
            className="absolute h-4 w-4 top-2 left-2 opacity-65"
          />
          <input
            value={search}
            onFocus={()=>navigate("/products")}
            type="search"
            placeholder="Search"
            onChange={handleChange}
            className="h-8 w-50 md:w-40 lg:w-48 flex items-center rounded-full pl-10 border border-[1px] focus:outline-blue-400 focus:border-0 pr-2"
          />
        </div>
      </form>
    </div>
  );
}
