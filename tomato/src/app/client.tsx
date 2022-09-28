import * as React from "react";

import {Routes} from "@pages/routes";
import {GlobalStyles} from "@shared/lib/styling";
import {CredentialsObtainer} from "@features/auth/lib/credentials-obtainer";

const globalStyles = <GlobalStyles />;

export const App: React.FC = () => (
  <>
    {globalStyles}
    <CredentialsObtainer>
      <Routes />
    </CredentialsObtainer>
  </>
);
