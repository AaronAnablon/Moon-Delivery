import StarRating from "./StarRating";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { url } from "../../slices/api";
import axios from "axios";

const Products = ({searchInput}) => {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()


  useEffect(() => {
    fetchSearchResults();
  }, [searchInput, currentPage]);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/products/searchSimilar?keyword=${searchInput}`);
      const { data: fetchedResults, total } = response.data;
      setResults((prevResults) =>
        currentPage === 1 ? fetchedResults : [...prevResults, ...fetchedResults]
      );
      setTotalResults(total);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

useEffect(() => {
    setCurrentPage(1)
  }, [searchInput])

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && results.length < totalResults) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <h3 className="text-light">You may also like</h3>
    {isLoading && <h3>loading..</h3>}
      <div onScroll={handleScroll} style={{ height: '300px', overflow: 'auto' }}>
      <Container className="d-flex flex-wrap">
        {results &&
          results.map((product) => (
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
      </div>
    </div>
  );
};

export default Products;
