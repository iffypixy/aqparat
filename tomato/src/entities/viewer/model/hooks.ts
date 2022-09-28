import {useSelector} from "react-redux";

import * as selectors from "./selectors";

export const useCredentials = () => useSelector(selectors.credentials);
export const useViewerType = () => useSelector(selectors.type);
