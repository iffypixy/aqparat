import {viewerModel} from "@entities/viewer";
import * as React from "react";
import {Navigate} from "react-router-dom";

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({children}) => {
  const isAuthenticated = !!viewerModel.useCredentials();

  if (!isAuthenticated) return <>{children}</>;

  return <Navigate to="/" />;
};
