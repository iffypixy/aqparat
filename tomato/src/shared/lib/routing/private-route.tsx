import * as React from "react";
import {Navigate} from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  // @todo: check if is authenticated
  const isAuthenticated = false;

  if (isAuthenticated) return <>{children}</>;

  return <Navigate to="/login" />;
};
