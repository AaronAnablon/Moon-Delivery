import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsCreate } from "../../slices/productsSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const createStatus = useSelector((state) => state.products.createStatus);
  const auth = useSelector((state) => state.auth);
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setcategory] = useState("");
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate()


  const handleProductImageUpload = (e) => {
    const files = e.target.files;
    const images = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // check if the file is an image
        if (file.type.startsWith("image/")) {
          images.push(reader.result);
        }
  
        if (i === files.length - 1) {
          // check if at least one valid image is selected
          if (images.length > 0) {
            setProductImages(images);
          } else {
            setProductImages([]);
          }
        }
      };
    }
  };
  

  const handleCancel = () => {
    navigate("/admin/products")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Array.isArray(productImages));
    if (productImages.length === 0) {
      alert("Please upload at least one product image");
      return;
    }
   
    dispatch(
      productsCreate({
        name,
        brand,
        desc,
        stores: auth.name,
        storeId: auth._id,
        address: auth.address,
        rating: { rating: 0, count: 0, },
        category,
        price,
        image: productImages,
      })
    );
    navigate("/admin/products")
  };

  return (
    <div className="shadow mb-4">
      <input type="file" name="images" onChange={handleProductImageUpload} multiple accept="image/*" required />
      <Form className="d-md-flex p-3 container-fluid" onSubmit={handleSubmit}>
        <div className="col-lg-6 col-12">
          {productImages && productImages.map((image, index) => (
            <img key={index} style={{ width: '90%' }} src={image} alt={`Product ${index}`} />
          ))}
        </div>

        <div className="col-lg-6 p-3 col-12">
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Brand"
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setcategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Accesories">Accessories</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Food">Food</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Short Description"
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit">
            {createStatus === "pending" ? "Submitting" : "Submit"}
          </Button>
          <Button variant="danger" onClick={() => handleCancel()}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateProduct;

