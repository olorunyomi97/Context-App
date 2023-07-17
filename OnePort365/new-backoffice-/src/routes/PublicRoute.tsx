import React from "react";
import { Route } from "react-router-dom";
import {
  object as objectPropType,
  array as arrayPropType,
  func,
  oneOfType,
} from "prop-types";

/**
 * @function PublicRoute
 * @description - constructs the applications public route layout
 * @returns {JSX} - JSX
 */

//   @ts-ignore
const PublicRoute = ({ component: Component, ...rest }): JSX.Element => {
  return <Route {...rest} element={() => <Component />} />;
};

PublicRoute.propTypes = {
  component: oneOfType([arrayPropType, objectPropType, func]).isRequired,
};

export default PublicRoute;