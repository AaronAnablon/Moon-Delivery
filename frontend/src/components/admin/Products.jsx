import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setHeaders, url } from "../../slices/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import DeleteConfirmation from "../formatters/DeleteConfirmation";
import CurrencyFormat from "../formatters/CurrencyFormat";

const Products = () => {
  const [products, setProducts] = useState('')
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditProduct = (productId) => {
    setEditingProduct(productId);
    const product = products.find(p => p._id === productId);
    setName(product.name);
    setDesc(product.desc);
    setPrice(product.price);
    setAddress(product.address);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/products/seller/${auth._id}`, setHeaders());
      const products = response.data;
      setProducts(products.reverse());
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleCancelEdit = () => {
    setEditingProduct(null);
    setName("");
    setDesc("");
    setPrice("");
    setAddress("");
  };

  const handleSaveProduct = async (_id, event) => {
    event.preventDefault(); 
    try {
      const editedProduct = {
        ...products.find(p => p._id === editingProduct),
        name,
        desc,
        price,
        address,
      };
      await axios.put(`${url}/products/${_id}`, editedProduct, setHeaders());
      toast.success("Product updated successfully");
      setEditingProduct(null);
      setName("");
      setDesc("");
      setPrice("");
      setAddress("");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };



  const handleConfirmAction = async (productId) => {
    const desc = { desc: "deleted" }
    // desc, 
    try {
      await axios.delete(`${url}/products/${productId}`, setHeaders());
      toast.success("Product deleted successfully");
      fetchData();
    } catch (error) {
      console.log(error);
    }
    console.log('Action confirmed!');
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <h2>Products</h2>
      </div>
      {products?.length === 0 && <p>No Products Found</p>}
      <Button className="m-3" onClick={() => navigate("/admin/products/create-product")}>
        ADD PRODUCT
      </Button>
      <Outlet />
      <div className="container-fluid">
        {products && products?.map((product) => (
          <div key={product._id}>
            {editingProduct === product._id ? (
              <div className="d-flex">
                <div className="col-6 d-none d-md-block">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    style={{ zIndex: '1', width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-12 col-md-6 shadow p-5">
                  <form>
                    <div className="form-group">
                      <label htmlFor="productName">Product Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description:</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        spellCheck="false"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="price">Price:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="storeAddress">Store Address:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="storeAddress"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="buttons">
                      <Button variant="primary" className="m-2" onClick={(e) => handleSaveProduct(product._id, e)}>
                        Save
                      </Button>
                      <Button variant="secondary" className="m-2" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

            ) : (
              <div className="container-fluid col-12 d-flex mb-3 shadow">
                <div className="col-6" >
                  <img src={product.image[0]} alt={product.name} style={{ zIndex: '1', width: '100%', height: '300px', objectFit: 'cover' }} />
                </div>
                <div className="col-6 px-2">
                  <h3>Product Details</h3>
                  <form>
                    <div className="form-group">
                      <label htmlFor="productName">Product Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={product.name}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="productNumber">Product Number:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productNumber"
                        value={product._id}
                        disabled
                      />
                    </div>
                    <div className="form-group" title={product.desc}>
                      <label htmlFor="productDescription">Description:</label>
                      <textarea
                        className="form-control"
                        id="productDescription"
                        value={product.desc}
                        disabled
                      ></textarea>
                    </div>
                    <div className="form-group SellerPrice">
                      <label htmlFor="productPrice">Price:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="productPrice"
                        value={CurrencyFormat(product.price)}
                        disabled
                      />
                    </div>
                    <div className="form-group SelleAddress">
                      <label htmlFor="storeAddress">Store Address:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="storeAddress"
                        value={product.address}
                        disabled
                      />
                    </div>
                    <div className="buttons">
                      <button className="btn btn-primary m-2" onClick={() => handleEditProduct(product._id)}>
                        Edit
                      </button>
                      <DeleteConfirmation
                        className="btn btn-danger m-2"
                        onConfirm={handleConfirmAction}
                        params={product._id}
                        message="Deleting items cannot be retrieved. Items deleted will not be visible on the shopping page for users."
                      />
                    </div>
                  </form>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;






