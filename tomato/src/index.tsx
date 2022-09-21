import * as React from "react";
import {createRoot} from "react-dom/client";

import {App} from "./app";

const element = document.getElementById("root");
const root = createRoot(element as Element);

root.render(<App />);
