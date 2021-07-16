import React from "react";

import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection.styles.scss";

import { selectCollection } from "../../redux/shop/shop.selector";
import { connect } from "react-redux";

const CollectionPage = ({ match, collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item}></CollectionItem>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    collection: selectCollection(
      ownProps.match && ownProps.match.params.collectionId
    )(state),
  };
};

export default connect(mapStateToProps)(CollectionPage);
