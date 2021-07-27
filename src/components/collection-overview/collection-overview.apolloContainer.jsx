import React from "react";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionOverview from "./collection-overview.component";
import WithSpinner from "../spinner/spinner.component";

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const collectionsSpinner = WithSpinner(CollectionOverview);

const CollectionOverviewApolloContainer = () => {
  return (
    <Query query={GET_COLLECTIONS}>
      {({ loading, error, data }) => {
        if (loading) {
          return collectionsSpinner(loading);
        } else {
          return <CollectionOverview collections={data.collections} />;
        }
      }}
    </Query>
  );
};

export default CollectionOverviewApolloContainer;
