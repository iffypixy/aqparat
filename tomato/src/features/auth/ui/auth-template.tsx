import * as React from "react";
import styled from "@emotion/styled";

import {Template} from "@shared/ui/templates";

import block from "../assets/block.png";

interface AuthTemplateProps {
  children?: React.ReactNode;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({children}) => (
  <Template.Fullscreen>
    <Wrapper>
      <Content>
        <ImageBlock />

        <FormBlock>
          <FormBlockContent>{children}</FormBlockContent>
        </FormBlock>
      </Content>
    </Wrapper>
  </Template.Fullscreen>
);

const Wrapper = styled("div")`
  width: 100%;
  height: 100%;
  background-color: #ffead1;
  padding: 6rem;
`;

const Content = styled("div")`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
`;

const ImageBlock = styled("div")`
  width: 50%;
  height: 100%;
  background-image: url(${block});
  background-size: cover;
  background-position: bottom;
`;

const FormBlock = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: #ffdfb9;
`;

const FormBlockContent = styled("div")`
  width: 50%;
  text-align: center;
`;
