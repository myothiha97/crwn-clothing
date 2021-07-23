import React, { useContext } from "react";

import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection.styles.scss";
import CollectionsContext from "../../contexts/collections/collecions.context";

// import { selectCollection } from "../../redux/shop/shop.selector";
// import { connect } from "react-redux";

const CollectionPage = ({ match }) => {
  const collections = useContext(CollectionsContext);
  const collection = collections[match.params.collectionId];
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

// const mapStateToProps = (state, ownProps) => {
//   console.log(ownProps);
//   return {
//     collection: selectCollection(
//       ownProps.match && ownProps.match.params.collectionId
//     )(state),
//   };
// };

export default CollectionPage;
