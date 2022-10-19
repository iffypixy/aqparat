import * as React from "react";
import {css, Global} from "@emotion/react";

import {normalized} from "./normalized";

import RubikLight from "@public/fonts/Rubik-Light.woff2";
import RubikMedium from "@public/fonts/Rubik-Medium.woff2";
import RubikBold from "@public/fonts/Rubik-Bold.woff2";
import RubikRegular from "@public/fonts/Rubik-Regular.woff2";

const styles = css`
  ${normalized}

  html {
    font-size: 62.5%;
    box-sizing: border-box;

    @media only screen and (max-width: 1400px) {
      font-size: 62.5%;
    }

    @media only screen and (max-width: 1200px) {
      font-size: 55%;
    }

    @media only screen and (max-width: 992px) {
      font-size: 52.5%;
    }

    @media only screen and (max-width: 768px) {
      font-size: 50%;
    }

    @media only screen and (max-width: 576px) {
      font-size: 45%;
    }

    @media only screen and (max-width: 320px) {
      font-size: 40%;
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
    font-family: "Rubik", sans-serif;
    font-weight: 400;
    background-color: #ffead1;
  }

  @font-face {
    font-family: "Rubik";
    font-weight: 300;
    src: url(${RubikLight}) format("woff2");
  }

  @font-face {
    font-family: "Rubik";
    font-weight: 400;
    src: url(${RubikRegular}) format("woff2");
  }

  @font-face {
    font-family: "Rubik";
    font-weight: 500;
    src: url(${RubikMedium}) format("woff2");
  }

  @font-face {
    font-family: "Rubik";
    font-weight: 700;
    src: url(${RubikBold}) format("woff2");
  }

  .rti--container {
    width: 100%;
    background: none;
    border: 1px solid #2d2d2d;
    border-bottom: 2px solid #2d2d2d;
    padding: 1rem;
    text-transform: uppercase;

    input {
      width: 100%;
      background: none;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 1.4rem;

      &::placeholder {
        color: #747474;
        opacity: 0.65;
      }
    }
  }
`;

export const GlobalStyles: React.FC = () => <Global styles={styles} />;
