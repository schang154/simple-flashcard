import React from "react";
import { navigate } from "gatsby";

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (typeof window !== 'undefined') {
    if (
      !localStorage.getItem("userProfile") &&
      window.location.pathname !== `/app/login`
    ) {
      navigate("/app/login");
      return null;
    }
    return <Component {...rest} />;
  }
  return null;
};
export default PrivateRoute;
