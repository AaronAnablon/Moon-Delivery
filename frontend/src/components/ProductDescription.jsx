import { useState } from "react";

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
        <h3>{product.name}</h3>
        <div className="details">{product.desc}</div>
        <div className="price">₱{product.price}</div>
        <div className="stores">{product.stores}</div>
        <div>{product.rating}</div>
        <div className="storeAddress">Lagawe, Ifugao</div>
        <button onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductDescription;
