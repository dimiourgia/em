import React, {useRef, useEffect, useState} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './CarouselStyles.css'; // Ensure this is correctly imported
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import debounce from 'lodash.debounce';

const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 5 },
};


const CarouselComponent = ({items, key, isDummy, showControls=true, autoPlay=false}) => {

  const carouselRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [isPrevEnabled, setIsPrevEnabled] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(true);

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
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 568) {
        setItemsPerView(responsive[0].items);
      } else if (width < 1024) {
        setItemsPerView(responsive[568].items);
      } else {
        setItemsPerView(responsive[1024].items);
      }
    };

    window.addEventListener('resize', updateItemsPerView);
    updateItemsPerView();

    return () => {
      window.removeEventListener('resize', updateItemsPerView);
    };
  }, []);

  // useEffect(() => {
  //   console.log(isInView, 'is carousel in view');
  //   if(isInView){
  //     setCarouselKey(pre=>pre+1);
  //   }
  // }, [isInView]);

  const handlePrevious = ()=>{
    setIsNextEnabled(true);
    if(!isPrevEnabled) return;
    setIsPrevEnabled(false);
    
    setTimeout(()=>{
      if(carouselKey > 1)
        setIsPrevEnabled(true);
    },700);

    const total = 1+(items.length-itemsPerView);

    setCarouselKey(pre=>{
      if(pre>0){
        console.log(pre-1, 'pre key')
        if(pre-1 == 0) setIsPrevEnabled(false);
        return pre-1;
      }else{
        console.log(0, 'next key')
        setIsPrevEnabled(false);
        return 0;
      }
    })
  }

  const handleNext = ()=>{
    if(!isNextEnabled) return;
    const total = 1+(items.length-itemsPerView);

    setIsNextEnabled(false);
    setTimeout(()=>{
      if(carouselKey < total -2 )
      setIsNextEnabled(true);
    },700)

    setIsPrevEnabled(true);

    setCarouselKey(pre=>{
      if(pre<total-1){
        return pre+1;
      }else {
        setIsNextEnabled(false);
        return pre;
      }
    });
  }

  return (<div className='relative'>
    <AliceCarousel
      activeIndex={showControls&&carouselKey}
      renderKey={key}
      ref={carouselRef}
      mouseTracking
      items={items}
      responsive={responsive}
      keyboardNavigation={true}
      autoPlay={autoPlay}
      autoPlayInterval={2000} // Adjust this value for speed, 5000 ms = 5 seconds
      animationDuration={700}
      renderDotsItem={()=>null}
      renderPrevButton={() => {
        return (
          <button className="text-black">
            Previous
            {/* &#9664; Unicode for left arrow */}
          </button>
        );
      }}
      renderNextButton={() => {
        return (
          <button className="text-black">
            Next
            {/* &#9654; Unicode for right arrow */}
          </button>
        );
      }}
    />
    {!isDummy && showControls &&
      <>
        <div onClick={handlePrevious} className={`custom-prev-button ${!isPrevEnabled&&'custom-prev-button-disabled'}`}><ArrowBackIosIcon /></div>
        <div onClick={handleNext} className={`custom-next-button ${!isNextEnabled&&'custom-next-button-disabled'}`}><ArrowForwardIosIcon/></div>
      </>
    }
  </div>);
};

export default CarouselComponent;
