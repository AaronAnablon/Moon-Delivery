import { useState, useEffect, useRef } from 'react';
import delivery from './images/delivery-bike.png';
import cod from './images/cash-on-delivery.png';
import homeDelivery from './images/home-delivery.png';
import packaged from './images/package.png';
import usingPhone from './images/using-phone .png';
import call from './images/call.png';
import deliver from './images/deliver.png';

const Blog = () => {
  const [typedText, setTypedText] = useState('');
  const [showPointer, setShowPointer] = useState(true);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const text =
      'Mooon Delivery was founded by a group of young individuals studying under the Bachelor of Science in Business and Management program at Ifugao State University. What began as a school project quickly evolved into a thriving business, driven by a passion for excellence and a deep connection to the local community. Since our inception, we have been dedicated to revolutionizing the delivery experience and providing a service that reflects the warmth and hospitality of our region.';

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length - 1) {
        setTypedText((prevText) => prevText + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 27);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  useEffect(() => {
    const pointerInterval = setInterval(() => {
      setShowPointer((prevShowPointer) => !prevShowPointer);
    }, 500);

    return () => {
      clearInterval(pointerInterval);
    };
  }, []);

 
  return (
    <div className="d-md-flex mb-5 align-items-center" style={{background: 'linear-gradient(45deg, rgba(244,61,0,1) 66%, rgba(229,212,11,1) 66%)'}}> 
      <div className="col-md-6 col-12">
        <h4 className="text-light p-5">
          {typedText}
          <span>{showPointer ? '|' : ''}</span>
        </h4>
      </div>
      <div
        className={`col-md-6 container-fluid image-container animation-finished`}
        ref={imageContainerRef}
      >
        <img src={delivery} alt="Delivery" className="top-left-image" />
        <img src={homeDelivery} alt="Home Delivery" className="top-right-image" />
        <img src={cod} alt="Call" className="center-image" />
        <img src={deliver} alt="Packaged" className="right-image" />
        <img src={packaged} alt="Packaged" className="left-image" />
        <img src={call} alt="COD" className="bottom-left-image" />
        <img src={usingPhone} alt="Using Phone" className="bottom-right-image" />
      </div>
    </div>
  );
};

export default Blog
