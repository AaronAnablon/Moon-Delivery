import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import ProductDescription from "./ProductDescription";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { setHeaders, url } from "../slices/api";
import axios from "axios";

const HighRating = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);
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



  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  const handleCloseProductDescription = () => {
    setSelectedProduct(null);
  };


  return (
         <div className="d-flex m-3 justify-content-center">
          
                         {loading && <p>Loading...</p>}
            <div className="carousel-container" >
  {data && (
    <Carousel autoPlay={true} infiniteLoop={true} interval={2000}
     showArrows={false} showThumbs={false} stopOnHover={true} showStatus={false}>
      {data.map((product) => (
        <div key={product._id}>
          <div onClick={() => handleProductClick(product)}>
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

            {selectedProduct && (
              <ProductDescription
                product={selectedProduct}
                onClose={handleCloseProductDescription}
                handleAddToCart={() => handleAddToCart(selectedProduct)}
              />
            )}
             </div>
      );
};

export default HighRating;
