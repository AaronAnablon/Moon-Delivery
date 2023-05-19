import StarRating from "./StarRating";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { url } from "../slices/api";
import axios from "axios";

const Products = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await axios.get(`${url}/products/increment?page=${currentPage}`);
    const newData = response.data.products;
    setData(prevData => {
      const filteredData = newData.filter(product => !prevData.find(p => p._id === product._id));
      return [...prevData, ...filteredData];
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const toProductDetails = (product) => {
    navigate('/productDetails', { state: { product: product } });
  };

  const shuffleProducts = () => {
    setData(prevData => {
      const shuffledData = [...prevData];
      for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
      }
      return shuffledData;
    });
  };

  return (
    <div>
      <h3 className="text-light">You may also like</h3>
      <Container className="d-flex flex-wrap">
        {data &&
          data.map((product) => (
            <div key={product._id}>
              <Card className="m-1" style={{ width: '10rem' }} onClick={() => toProductDetails(product)}>
                <Card.Img variant="top" src={product.image} style={{ zIndex: '1', width: '100%', height: '130px', objectFit: 'cover' }} />
                <Card.Body style={{ fontSize: '13px' }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                  <div>₱{product.price}</div>
                  <StarRating rating={product.rating.rating} overAll={product.rating.count} />
                  <div style={{ fontSize: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.address}</div>
                </Card.Body>
              </Card>
            </div>
          ))
        }
      </Container>
      <div className="d-flex flex-row justify-content-center border-bottom p-3">
        {data.length > 0 ?
          <>
            <Button onClick={handleLoadMore}>Load more</Button>
            <Button onClick={shuffleProducts}>Shuffle</Button>
          </> :
          <div>
            <p>No Products found</p>
            <button onClick={() => fetchProducts()}>Refresh</button>
          </div>
        }
      </div>
    </div>
  );
};

export default Products;
