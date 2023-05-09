import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import ProductDescription from "./ProductDescription";
import HighRating from "./HighRating";
import { url } from "../slices/api";
import axios from "axios";
import StarRating from "./StarRating";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortedBrand, setSortedBrand] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [hide, setHide] = useState(false)

  const dispatch = useDispatch();
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
    setCurrentPage(1); // reset current page to 1 when searching
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
    
  console.log(filteredData)
  return (
    <div>
         <div style={{position: 'sticky',  top: '70px'}}>
        <input type="text" value={searchKeyword} onChange={handleKeywordChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
          {!hide && <HighRating />}
          <div className="home-container">
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={() => handleSortByBrand("")}>
                All
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSortByBrand("Accesories")}>
                Accesories
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSortByBrand("Cosmetics")}>
                Cosmetics
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSortByBrand("Food")}>
                Food
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSortByBrand("Other")}>
                Other
              </Link>
            </li>
            <li>
              <NavLink to="/booking" activeClassName="link-active">
                Services
              </NavLink>
            </li>

          </ul>
        </nav>
              
          <>
            <h2>New Arrivals</h2>
            <div className="products">
              {filteredData &&
                filteredData.map((product) => (
                  <div key={product._id} className="product">
                    <div onClick={() => handleProductClick(product)}>
                      {product.image && <img src={product.image} alt={product.name} />}
                      <h3 style={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
                      <h3>₱{product.price}</h3>
                      <StarRating rating={product.rating.rating} overAll={product.rating.count}/>
                      <div style={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden',
                       textOverflow: 'ellipsis', fontSize: '10px' }}>{product.address}</div>
                    </div>
                   </div>
                ))}           
            </div>
            {filteredData.length > 0 ? 
                <button onClick={handleLoadMore}>Load more</button> :
               <div> <p>No Products found</p>
               <button onClick={() => fetchProducts()}>Refresh</button></div> }
            {selectedProduct && (
              <ProductDescription
                product={selectedProduct}
                onClose={handleCloseProductDescription}
                handleAddToCart={() => handleAddToCart(selectedProduct)}
              />
            )}
          </>    
      </div>
    </div>
  );
};

export default Home;
