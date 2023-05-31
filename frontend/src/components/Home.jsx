import HighRating from "./products/HighRating";
import StarRating from "./products/StarRating";
import TopProducts from "./products/TopProducts";
import TopSold from "./products/TopSold";
import NavCategories from "./NavCategories";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { url } from "../slices/api";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = ({ searchData }) => {
  const auth = useSelector((state) => state.auth)
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedBrand, setSortedBrand] = useState("");
  const [hide, setHide] = useState(true)
  const [totalPage, setTotalPage] = useState('')

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await axios.get(`${url}/products/increment?page=${currentPage}`);
    const newData = response.data.products;
    setTotalPage(response.data.totalPages)
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
    console.log(currentPage)
  };

  const toProductDetails = (product) => {
    navigate('/productDetails', { state: { product } });
  }
  if (auth.isRider) {
    navigate('/rider')
  } else if (auth.isAdmin) {
    navigate('/admin/summary')
  }
  return (
    <>
      <div className="container-fluid">
        {hide && <><HighRating toProductDetails={toProductDetails} />
          <div className="d-flex flex-row justify-content-center"><h2>Top Rated</h2></div></>}
        {hide && <TopProducts toProductDetails={toProductDetails} />}
        <NavCategories handleSortByBrand={handleSortByBrand} />
        <div className="d-flex justify-content-center">
          <h2>New Arrivals</h2>
        </div>
        <div className="col-12 d-flex flex-wrap">
          {filteredData &&
            filteredData.map((product) => (
              <div key={product._id} onClick={() => toProductDetails(product)} className="col-6 col-md-3 col-lg-2 p-1">
                <Card>
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
        </div>
        <div className="d-flex flex-row justify-content-center border-bottom p-3">
          {filteredData.length > 0 ?
            totalPage > currentPage && <Button onClick={handleLoadMore}>Load more</Button> :
            <div> <p>No Products found</p>
              <Button onClick={() => fetchProducts()}>Refresh</Button></div>}
        </div>
        {hide && <div style={{
          background: 'rgb(250,81,48)',
          background: 'linear-gradient(90deg, rgba(250,81,48,1) 0%, rgba(198,198,198,1) 50%, rgba(250,81,48,1) 96%)'
        }}
        ><div className="d-flex flex-row justify-content-center m-3"><h2>Top Sold</h2></div>
          <TopSold toProductDetails={toProductDetails} /></div>}

      </div>
    </>
  );
};

export default Home;
