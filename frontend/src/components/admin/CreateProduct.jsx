import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { productsCreate } from "../../slices/productsSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setcategory] = useState("");
  const [productImages, setProductImages] = useState([]);

  
  const handleProductImageUpload = (e) => {
  console.log(auth)
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
  
          if (images.length === files.length) {
            setProductImages(images);
          }
        }
      };
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if there are product images
    if (productImages.length === 0) {
      alert("Please upload at least one product image");
      return;
    }
    // for (let i = 0; i < productImages.length; i++) {
     //console.log(productImages[0]);
      dispatch(
        productsCreate({
          name,
          brand,
          desc,
          stores: auth.name,
          storeId: auth._id,
          address: auth.address,
          rating: {rating: 0, count: 0,},
          category,
          price,
          image: productImages[0],
        })
      );
    // }   name,

    
  };

  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Create a Product</h3>
        <ImagePreview>
          {productImages.map((image, index) => (
            <img key={index} src={image} alt={`Product ${index}`} />
          ))}
        </ImagePreview>
        <input type="file" name="images" onChange={handleProductImageUpload} multiple accept="image/*" required/>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} required />
        <select onChange={(e) => setcategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Accesories">Accesories</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Food">Food</option>
          <option value="other">Other</option>
        </select>        
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />

        <PrimaryButton type="submit">
          {createStatus === "pending" ? "Submitting" : "Submit"}
        </PrimaryButton>
      </StyledForm>
    </StyledCreateProduct>
  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display:
 flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 0;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
