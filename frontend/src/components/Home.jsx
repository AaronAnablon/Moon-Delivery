import HighRating from "./products/HighRating";
import StarRating from "./products/StarRating";
import TopProducts from "./products/TopProducts";
import TopSold from "./products/TopSold";
import NavCategories from "./NavCategories";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { url } from "../slices/api";
import axios from "axios";

const Home = ({ searchData }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedBrand, setSortedBrand] = useState("");
  const [hide, setHide] = useState(true)


  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await axios.get(`${url}/products/increment?page=${currentPage}`);
    const newData = response.data.products;
    setData(prevData => {
      const filteredData = newData.filter(product => !prevData.find(p => p._id === product._id));
      return [...prevData, ...filteredData];
    });
  };

  const handleSearch = () => {
    setHide(!hide)
    setCurrentPage(1);
    axios.get(`${url}/products/search?keyword=${searchData}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleSearch()
    if (searchData === "") {
      setHide(true)
    } else {
      setHide(false)
    }
  }, [searchData]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);


  const handleSortByBrand = (brand) => {
    setSortedBrand(brand);
  };

  const filteredData = sortedBrand
    ? data?.filter((product) => product.category === sortedBrand)
    : data;

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const toProductDetails = (product) => {
    navigate('/productDetails', { state: { product } });
  }

  return (
    <>
      <div>
        {hide && <><HighRating toProductDetails={toProductDetails} />
        <div className="d-flex flex-row justify-content-center"><h2>Top Rated</h2></div></>}
        {hide && <TopProducts toProductDetails={toProductDetails} />}

        <div> 
          <NavCategories handleSortByBrand={handleSortByBrand}/>
          <>
            <div className="d-flex flex-row justify-content-center">
              <h2>New Arrivals</h2>
            </div>
            <Container className="d-flex flex-wrap">
              {filteredData &&
                filteredData.map((product) => (
                  <div key={product._id}>
                    <Card className="m-1" style={{ width: '10rem' }} onClick={() => toProductDetails(product)} >
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
              {filteredData.length > 0 ?
                <Button onClick={handleLoadMore}>Load more</Button> :
                <div> <p>No Products found</p>
                  <Button onClick={() => fetchProducts()}>Refresh</Button></div>}
            </div>
            {hide && <><div className="d-flex flex-row justify-content-center m-3"><h2>Top Sold</h2></div>
             <TopSold toProductDetails={toProductDetails} /></>}
          </>
        </div>
      </div>
    </>
  );
};

export default Home;
