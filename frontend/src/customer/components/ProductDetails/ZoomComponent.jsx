import React, { useRef, useState, useEffect } from "react";

const ZoomComponent = ({ src }) => {
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [imageWidth, setImageWidth] = useState(0);
  const zoomRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    setBackgroundImage(`url(${src})`);
    const updateImageWidth = () => {
      if (zoomRef.current) {
        setImageWidth(zoomRef.current.offsetWidth);
        console.log('image widht', zoomRef.current.offsetWidth);
      }
    };
    updateImageWidth();
    window.addEventListener("resize", updateImageWidth);
    return () => {
      window.removeEventListener("resize", updateImageWidth);
    };
  }, [src]);

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width, height } = target.getBoundingClientRect();

    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;
    
    setBackgroundPosition(`${x}% ${y}%`);

    // Move the lens
    const lens = lensRef.current;
    lens.style.left = `${offsetX - lens.offsetWidth / 2}px`;
    lens.style.top = `${offsetY - lens.offsetHeight / 2}px`;
  };

  const [showLens, setShowLens] = useState(false);

  const handleMouseEnter = ()=>{
    setShowLens(true);
  }

  const handleMouseLeave = ()=>{
    setShowLens(false);
  }




  return (
    <div className="relative flex items-start">
      <div className="relative zoom p-1 h-full w-full object-contain" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} ref={zoomRef}>
        <img src={src} alt="Zoomable" className="w-full h-auto" />
        {showLens && <div
          ref={lensRef}
          className="absolute border border-black w-24 h-24"
          style={{ pointerEvents: "none" }}
        ></div>}

      </div>
      {showLens && <div
        className={`zoom-result absolute z-[100] -right-[450px] border border-gray-400`}
        style={{
          width: "396px",
          height: "600px",
          backgroundImage,
          backgroundSize: "800px 800px",
          backgroundPosition,
        }}
      ></div>}
    </div>
  );
};

export default ZoomComponent;
