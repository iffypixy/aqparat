import * as React from "react";
import styled from "@emotion/styled";

export interface MainTemplateProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({
  footer,
  header,
  children,
}) => (
  <Wrapper>
    {header && <Header>{header}</Header>}
    <Main>{children}</Main>
    {footer && <Footer>{footer}</Footer>}
  </Wrapper>
);

const Wrapper = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled("header")`
  width: 100%;
  z-index: 100;
`;

const Main = styled("main")`
  width: 100%;
`;

const Footer = styled("footer")`
  width: 100%;
`;
