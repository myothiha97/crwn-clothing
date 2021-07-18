import React, { Component } from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import CollectionPage from "../collection/collection.component";
import { updateCollections } from "../../redux/shop/shop.actions";
import {
  firestore,
  convertCollectionsSnashotToMap,
} from "../../firebase/firebase.utils";
import WithSpinner from "../../components/spinner/spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    loading: true,
  };
  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    collectionRef.onSnapshot(async (snapshot) => {
      const collectionMap = convertCollectionsSnashotToMap(snapshot);
      updateCollections(collectionMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            render={(props) => (
              <CollectionsOverviewWithSpinner
                isLoading={loading}
                {...props}
              ></CollectionsOverviewWithSpinner>
            )}
          ></Route>
          <Route
            exact
            path={`${match.path}/:collectionId`}
            render={(props) => (
              <CollectionPageWithSpinner
                isLoading={loading}
                {...props}
              ></CollectionPageWithSpinner>
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
