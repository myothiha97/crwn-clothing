import React from "react";
import { SpinnerOverlay, SpinnerContainer } from "./spinner.styles";

const WithSpinner = (WrapperComponent) => {
  const secondFunc = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer></SpinnerContainer>
      </SpinnerOverlay>
    ) : (
      <WrapperComponent {...otherProps}></WrapperComponent>
    );
  };
  return secondFunc;
};

export default WithSpinner;
