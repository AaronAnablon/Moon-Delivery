import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { setHeaders, url } from "../../slices/api";
import axios from "axios";
import { Card } from "react-bootstrap";

const TopSold = ({ toProductDetails }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getProducts = () => {
    setLoading(true);
    axios
      .get(`${url}/products/highSold`, setHeaders)
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
    console.log(data);
  }, []);

  const settings = {
    dots: true,
    slidesToShow: 6,
    arrows: true,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <div className="d-flex justify-content-center"> {/* Center the slider */}
      {loading && <p>Loading...</p>}
      <div style={{ maxWidth: "70%" }}> {/* Set a max width to prevent overlapping */}
        <Slider {...settings}>
          {data.map((product) => (
            <div key={product._id}>
              <Card className="col-11" onClick={() => toProductDetails(product)}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      height: "90px",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div className="text-truncate d-flex justify-content-center">
                  {product.rating.count} Sold
                </div>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopSold;
