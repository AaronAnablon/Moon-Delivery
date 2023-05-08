import { useState } from "react";
import StarRating from "./StarRating";

const ProductDescription = ({ product, onClose, handleAddToCart }) => {
  const [imageZoom, setImageZoom] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const toggleImageZoom = () => {
    setImageZoom(!imageZoom);
  };
  const handleImageMove = (e) => {
    if (imageZoom) {
      const container = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - container.left) / container.width) * 80;
      const y = ((e.clientY - container.top) / container.height) * 80;
      setImagePosition({ x, y });
    }
  };

  return (
    <div className="product-description-container" onClick={onClose}>
      <div className="product-description">
        <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          className={`zoomable-image ${imageZoom ? "zoomed-image" : ""}`}
          onDoubleClick={toggleImageZoom}
          onMouseMove={handleImageMove}
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: `scale(${imageZoom ? 2 : 1})`,
            transformOrigin: `${imagePosition.x}% ${imagePosition.y}%`,
          }}
        />
        </div>
          <div className="product-details">
          <div><h3>{product.name}</h3>
          <StarRating rating={product.rating.rating} overAll={product.rating.count}/>
          </div>
      
        <div >{product.desc}</div>
        <div>₱{product.price}</div>
        <div>{product.stores}</div>
        <div className="storeAddress">Lagawe, Ifugao</div>
        <button onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
