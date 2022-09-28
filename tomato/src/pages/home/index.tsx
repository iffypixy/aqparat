import {viewerModel} from "@entities/viewer";
import React from "react";
import {Navigate} from "react-router-dom";

import {HomePublic} from "./home.public";

export const Home: React.FC = () => {
  const credentials = viewerModel.useCredentials();

  console.log(credentials);
  const type = viewerModel.useViewerType();

  if (credentials) {
    if (type === "volunteer")
      return <Navigate to={`/volunteers/${credentials.id}`} />;
    else if (type === "organisation")
      return <Navigate to={`/organisations/${credentials.id}`} />;
  } else return <HomePublic />;

  return null;
};
