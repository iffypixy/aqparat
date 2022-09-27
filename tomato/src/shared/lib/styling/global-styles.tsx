import * as React from "react";
import {css, Global} from "@emotion/react";

import {normalized} from "./normalized";

import MontserratLight from "@public/fonts/Montserrat-Light.woff2";
import MontserratMedium from "@public/fonts/Montserrat-Medium.woff2";
import MontserratBold from "@public/fonts/Montserrat-Bold.woff2";
import MontserratRegular from "@public/fonts/Montserrat-Regular.woff2";

const styles = () => css`
  ${normalized}

  html {
    font-size: 62.5%;
    box-sizing: border-box;

    @media (max-width: 320px) {
    }

    @media (max-width: 576px) {
    }

    @media (max-width: 768px) {
    }

    @media (max-width: 992px) {
    }

    @media (max-width: 1200px) {
    }

    @media (max-width: 1400px) {
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 1.6rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
  }

  @font-face {
    font-family: "Montserrat";
    font-weight: 300;
    src: url(${MontserratLight}) format("woff2");
  }

  @font-face {
    font-family: "Montserrat";
    font-weight: 400;
    src: url(${MontserratRegular}) format("woff2");
  }

  @font-face {
    font-family: "Montserrat";
    font-weight: 500;
    src: url(${MontserratMedium}) format("woff2");
  }

  @font-face {
    font-family: "Montserrat";
    font-weight: 700;
    src: url(${MontserratBold}) format("woff2");
  }
`;

export const GlobalStyles: React.FC = () => <Global styles={styles} />;
