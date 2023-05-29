import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from "react-router-dom";

const HighRating = () => {
  const navigate = useNavigate()

  const services = [
    {
      _id: 'Pabili',
      image: 'https://res.cloudinary.com/dldx2inhf/image/upload/v1685182642/Flyers/photo_2023-05-27_18-13-55_fxq7uc.jpg',
      location: '/booking/pabili'
    },
    {
      _id: 'Pakuha/Padala',
      image: 'https://res.cloudinary.com/dldx2inhf/image/upload/v1685182639/Flyers/photo_2023-05-27_18-14-01_euvlcg.jpg',
      location: '/booking/pakuhaPadala'
    },
    {
      _id: 'Book_Ride',
      image: 'https://res.cloudinary.com/dldx2inhf/image/upload/v1685182634/Flyers/photo_2023-05-27_18-14-08_kstksy.jpg',
      location: '/booking/pahatidSundo'
    }
  ]

  const handleClick = (location) => {
    navigate(location)
    console.log(location)
  }

  return (
    <div className="d-flex justify-content-center">
    <div >
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={4000}
        showArrows={false}
        showThumbs={false}
        stopOnHover={true}
        showStatus={false}
        style={{maxWidth: '70%'}}
      >
        {services.map((service) => (
          <div key={service._id}>
            <div onClick={() => handleClick(service.location)}>
              <img
                src={service.image}
                alt={service._id}
                style={{
                  width: "100%",
                  objectFit: 'fill',
                  borderRadius: "4px"
                }}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  </div>
  
  );
};

export default HighRating;
