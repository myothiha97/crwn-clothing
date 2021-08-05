import React, { useRef, useEffect } from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleCartHidden, hideCart } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartIcon = ({ toggleCartHidden, itemCount, hideCart }) => {
  let outsideRef = useRef();
  console.log(outsideRef);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!outsideRef.current.contains(event.target)) {
        const dropdown = document.querySelector(".cart-dropdown");
        if (dropdown && dropdown.contains(event.target)) {
          return null;
        } else {
          hideCart();
        }
      }
    });

    return document.removeEventListener("mousedown", (event) => {
      if (outsideRef.current.contains(event.target)) {
        return null;
      }
    });
  });

  return (
    <div className="cart-icon" onClick={toggleCartHidden} ref={outsideRef}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  hideCart: () => dispatch(hideCart()),
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
