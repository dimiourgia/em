import React, {useRef, useEffect, useState} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './CarouselStyles.css'; // Ensure this is correctly imported

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};


const CarouselComponent = ({items, key}) => {

  const carouselRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      if (carouselRef.current) {
        const deltaX = e.deltaX;
        if (deltaX !== 0) {
          e.preventDefault();
        }
      }
    };

    const carouselWrapper = carouselRef.current?.rootElement?.querySelector('.alice-carousel__stage');

    if (carouselWrapper) {
      carouselWrapper.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (carouselWrapper) {
        carouselWrapper.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.intersectionRatio > 0.8);
      },
      {
        threshold: [0.8],
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current.rootElement);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current.rootElement);
      }
    };
  }, []);

  useEffect(() => {
    console.log(isInView, 'is carousel in view');
    if(isInView){
      setCarouselKey(pre=>pre+1);
    }
  }, [isInView]);

  return (
    <AliceCarousel
      // activeIndex={carouselKey}
      renderKey={key}
      ref={carouselRef}
      mouseTracking
      items={items}
      responsive={responsive}
      keyboardNavigation={true}
      infinite
      autoPlay={isInView}
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
