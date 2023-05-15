import HighRating from "./HighRating";
import StarRating from "./StarRating";
import TopProducts from "./TopProducts";
import TopSold from "./TopSold";

import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { Card } from 'react-bootstrap';
import { url } from "../slices/api";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedBrand, setSortedBrand] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [hide, setHide] = useState(false)

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
    axios.get(`${url}/products/search?keyword=${searchKeyword}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

      const handleKeywordChange = (event) => {
        setSearchKeyword(event.target.value);
        setHide(false)
      };

      const toProductDetails = (product) => {
        navigate('/productDetails', { state: { product: product } });
      }
    
  return (
    <>
    <div>
      <div className="d-flex bg-light justify-content-center full-width" style={{ position: 'sticky', top: '20px', zIndex: '99999' }}>
      <Form className="d-flex justify-content-center m-3" style={{width: '70%'}}>
        <Form.Control type="text" value={searchKeyword} onChange={handleKeywordChange}>
        </Form.Control>
        <Button variant="primary" onClick={handleSearch}><FaSearch /></Button>
      </Form>
    </div>
    {!hide && <HighRating toProductDetails={toProductDetails}/>}
    <div className="d-flex flex-row justify-content-center"><h2>Top Rated</h2></div>
    {!hide && <TopProducts toProductDetails={toProductDetails}/>}
         
      <div> <div className="d-flex flex-row justify-content-center">
      <nav className="sub-nav">
      <ul className="sub-nav-ul">
        <li>
          <NavLink exact to="/" activeClassName="link-active" onClick={() => handleSortByBrand("")}>
            All
          </NavLink>
        </li>
        <li>
          <NavLink to="#" activeClassName="link-active" onClick={() => handleSortByBrand("Accesories")}>
            Accesories
          </NavLink>
        </li>
        <li>
          <NavLink to="#" activeClassName="link-active" onClick={() => handleSortByBrand("Cosmetics")}>
            Cosmetics
          </NavLink>
        </li>
        <li>
          <NavLink to="#" activeClassName="link-active" onClick={() => handleSortByBrand("Food")}>
            Food
          </NavLink>
        </li>
        <li>
          <NavLink to="#" activeClassName="link-active" onClick={() => handleSortByBrand("Other")}>
            Other
          </NavLink>
        </li>
        <li>
          <NavLink to="/booking" activeClassName="link-active" className="services-link">
            Services
          </NavLink>
        </li>
      </ul>
    </nav> 
     </div>
          <>
          <div className="d-flex flex-row justify-content-center">
            <h2>New Arrivals</h2>
            </div>
            <Container className="d-flex flex-wrap">
            {filteredData &&
  filteredData.map((product) => (
    <div key={product._id}>
      <Card className="m-1" style={{ width: '10rem' }} onClick={() => toProductDetails(product)} >
        <Card.Img variant="top" src={product.image} style={{zIndex: '1', width: '100%', height: '130px', objectFit: 'cover' }}/>
        <Card.Body style={{ fontSize: '13px' }}>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
            <div>₱{product.price}</div>
            <StarRating rating={product.rating.rating} overAll={product.rating.count}/>
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
               <button onClick={() => fetchProducts()}>Refresh</button></div> }   
               </div>
               <div className="d-flex flex-row justify-content-center m-3"><h2>Top Sold</h2></div>
    {!hide && <TopSold toProductDetails={toProductDetails}/>}
          </>    
      </div>
    </div>
     </>
  );
};

export default Home;
