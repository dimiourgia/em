import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './CarouselStyles.css'; // Ensure this is correctly imported

const items = [
  <img src="https://via.placeholder.com/800x400" alt="1" key="1" />,
  <img src="https://via.placeholder.com/800x400" alt="2" key="2" />,
  <img src="https://via.placeholder.com/800x400" alt="3" key="3" />,
];


const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};


const CarouselComponent = ({items}) => {
  return (
    <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      keyboardNavigation={true}
      autoPlay
      infinite
      autoPlayInterval={2000} // Adjust this value for speed, 5000 ms = 5 seconds
      animationDuration={1000}
      renderPrevButton={() => {
        return (
          <button className="custom-prev-button">
            &#9664; {/* Unicode for left arrow */}
          </button>
        );
      }}
      renderNextButton={() => {
        return (
          <button className="custom-next-button">
            &#9654; {/* Unicode for right arrow */}
          </button>
        );
      }}
    />
  );
};

export default CarouselComponent;
