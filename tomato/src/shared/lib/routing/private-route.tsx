import {viewerModel} from "@entities/viewer";
import * as React from "react";
import {Navigate} from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const isAuthenticated = !!viewerModel.useCredentials();

  if (isAuthenticated) return <>{children}</>;

  return <Navigate to="/login" />;
};
