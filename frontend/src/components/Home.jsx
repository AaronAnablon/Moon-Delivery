import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import ProductDescription from "./ProductDescription";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortedBrand, setSortedBrand] = useState("");

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

  return (
    <div>
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
        {status === "success" ? (
          <>
            <h2>New Arrivals</h2>
            <div className="products">
              {filteredData &&
                filteredData.map((product) => (
                  <div key={product._id} className="product">
                    <div onClick={() => handleProductClick(product)}>
                      {product.image && <img src={product.image} alt={product.name} />}
                      <h3>{product.name}</h3>
                      <div className="price">₱{product.price}</div>
                      <div>{product.rating}</div>
                      <div className="storeAddress">{product.address}</div>
                    </div>
                    <button onClick={() => handleAddToCart(product)}>
                      Add To Cart
                    </button>
                  </div>
                ))}
            </div>
            {selectedProduct && (
              <ProductDescription
                product={selectedProduct}
                onClose={handleCloseProductDescription}
                handleAddToCart={() => handleAddToCart(selectedProduct)}
              />
            )}
          </>
        ) : status === "pending" ? (
          <p>Loading...</p>
        ) : (
          <p>Unexpected error occurred...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
