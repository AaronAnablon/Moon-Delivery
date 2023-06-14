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

  const handleSaveProduct = async (_id) => {
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



  const handleConfirmAction = async(productId) => {
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
      <div className="container-fluid col-12">
        {products && products?.map((product) => (
            <div key={product._id}>
              {editingProduct === product._id ? (
                <>
                  <div className="SellerDetails">
                    <h3>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </h3>
                    <div title={desc}>
                      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div className="SellerPrice">
                      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="SelleAddress">
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="buttons">
                      <button onClick={() => handleSaveProduct(product._id)}>
                        Save
                      </button>
                      <button onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="container-fluid col-12 d-flex mb-3 shadow">
                  <div className="col-6" >
                    <img src={product.image[0]} alt={product.name} style={{ zIndex: '1', width: '100%', height: '300px', objectFit: 'cover' }}/>
                  </div>
                  <div className="col-6">
                    <h3>{product.name}</h3>
                    <div title={product.desc}>{product.desc}</div>
                    <div className="SellerPrice"> {CurrencyFormat(product.price)} </div>
                    <div className="SelleAddress">{product.address}</div>
                    <div className="buttons">
                      <Button onClick={() => handleEditProduct(product._id)}>Edit</Button>
                      <DeleteConfirmation 
                      onConfirm={handleConfirmAction} 
                      params={product._id} 
                      message={"Deleting itmes can not be retrieved. Items deleted will not be visible to the shopping page for users."}/>
                    </div>
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






