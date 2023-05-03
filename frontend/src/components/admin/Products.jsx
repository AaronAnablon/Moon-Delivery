import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";
import { useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from "../../slices/productsApi";
import { toast } from "react-toastify";
import { setHeaders, url } from "../../slices/api";
import axios from "axios";


const Products = () => {
  const { data: products, isSuccess: isGetProductsSuccess, refetch } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

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

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setName("");
    setDesc("");
    setPrice("");
    setAddress("");
  };

  const handleDeleteProduct = async (productId) => {
      const desc = {desc: "deleted"}
    try {
      await axios.put(`${url}/products/${productId}`, desc, setHeaders());
      toast.success("Product deleted successfully");
      refetch();
    } catch (error) {
      console.log(error);
    }
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
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminHeaders>
        <h2>Products</h2>
      </AdminHeaders>
      <PrimaryButton onClick={() => navigate("/admin/products/create-product")}>
        ADD PRODUCT
      </PrimaryButton>
      <Outlet />
      <div className="SellerProducts">
        {isGetProductsSuccess &&
          products?.map((product) => (
            <div key={product._id} className="SellerProduct">
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
<>
<div className="SellerProductImage">
<img src={product.image} alt={product.name} />
</div>
<div className="SellerDetails">
<h3>{product.name}</h3>
<div title={product.desc}>{product.desc}</div>
<div className="SellerPrice">{product.price} USD</div>
<div className="SelleAddress">{product.address}</div>
<div className="buttons">
<button onClick={() => handleEditProduct(product._id)}>Edit</button>
<button disabled={isDeleting} onClick={() => handleDeleteProduct(product._id)}>
{isDeleting ? "Deleting..." : "Delete"}
</button>
</div>
</div>
</>
)}
</div>
))}
</div>
</>
);
};

export default Products;






