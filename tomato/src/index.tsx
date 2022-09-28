import * as React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import {Provider} from "react-redux";

import {store} from "@shared/lib/store";

import {App} from "./app";

const element = document.getElementById("root");
const root = createRoot(element as Element);

root.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ChakraProvider>,
);
