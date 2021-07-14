import "./checkout-item.styles.scss";
import React from "react";

const CheckOutItem = ({ cartItem: { name, imageUrl, price, quantity } }) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">{price}</span>
      <span className="remove-button">&#10005;</span>
      {/* #100005; is the utf8 Dingbats that was already exist in html */}
    </div>
  );
};

export default CheckOutItem;
