import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { setHeaders, url } from "../slices/api";
import axios from "axios";

const HighRating = ({toProductDetails}) => {
    const [loading, setLoading] =useState(false)
    const [data, setData] = useState()

    const getProducts = () => {
        setLoading(true);
        axios
          .get(`${url}/products/highRating`, setHeaders)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      };
    
      useEffect(() => {
        getProducts();
      }, []);

  return (
         <div className="d-flex m-3 justify-content-center">
          
                         {loading && <p>Loading...</p>}
            <div className="carousel-container" >
  {data && (
    <Carousel autoPlay={true} infiniteLoop={true} interval={2000}
     showArrows={false} showThumbs={false} stopOnHover={true} showStatus={false}>
      {data.map((product) => (
        <div key={product._id}>
          <div onClick={() => toProductDetails(product)}>
            {product.image && <img src={product.image} alt={product.name} style={{
    width: "80%", height: '200px', objectFit: 'cover',
    borderRadius: "4px"
  }}/>}
          </div>
        </div>
      ))}
    </Carousel>
    
  )}
</div>
             </div>
      );
};

export default HighRating;
