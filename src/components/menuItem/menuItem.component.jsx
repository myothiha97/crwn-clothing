import React from "react";
import "./menuItem.styles.scss";
import { Link, withRouter } from "react-router-dom";

function MenuItem({ size, imageUrl, title, linkUrl, history }) {
  return (
    <div className={`${size} menu-item`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="content" onClick={() => history.push(`/${linkUrl}`)}>
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
}

export default withRouter(MenuItem);
