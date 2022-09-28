import {store} from "./store";
import * as actions from "./actions";
import * as selectors from "./selectors";
import * as hooks from "./hooks";

export const model = {store, actions, selectors, ...hooks};
