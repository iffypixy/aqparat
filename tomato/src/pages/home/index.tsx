import React from "react";

import {HomePrivate} from "./home.private";
import {HomePublic} from "./home.public";

export const Home: React.FC = () => {
  const isAuthenticated = false;

  if (isAuthenticated) return <HomePrivate />;
  else return <HomePublic />;
};
