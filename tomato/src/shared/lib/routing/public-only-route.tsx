import * as React from "react";
import {Navigate} from "react-router-dom";

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({children}) => {
  // @todo: check if is authenticated
  const isAuthenticated = false;

  if (!isAuthenticated) return <>{children}</>;

  return <Navigate to="/" />;
};
