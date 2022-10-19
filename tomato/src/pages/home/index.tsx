import {viewerModel} from "@entities/viewer";
import React from "react";
import {Navigate} from "react-router-dom";

import {HomePublic} from "./home.public";

export const Home: React.FC = () => {
  const credentials = viewerModel.useCredentials();

  const type = viewerModel.useViewerType();

  if (credentials) {
    if (type === "volunteer") return <Navigate to={`/vol/${credentials.id}`} />;
    else if (type === "organisation")
      return <Navigate to={`/org/${credentials.id}`} />;
  } else return <HomePublic />;

  return null;
};
