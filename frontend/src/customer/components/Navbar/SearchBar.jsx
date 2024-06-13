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
            className="absolute h-5 w-5 top-2 left-3"
          />
          <input
            value={search}
            onFocus={()=>navigate("/products")}
            type="search"
            placeholder="Search"
            onChange={handleChange}
            className="h-9 w-36 md:w-40 lg:w-60 rounded-full pl-10"
          />
        </div>
      </form>
    </div>
  );
}
