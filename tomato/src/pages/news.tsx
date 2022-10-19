import * as React from "react";
import {Container, VStack} from "@chakra-ui/react";
import styled from "@emotion/styled";

import {Template} from "@shared/ui/templates";
import {Header} from "@widgets/header";

export const NewsPage: React.FC = () => {
  return (
    <Template.Main header={<Header />}>
      <Container maxW="container.xl">
        <VStack justify="center" align="center" spacing="5rem" mt="5rem">
          <Title>News</Title>

          <Empty>News will appear soon...</Empty>
        </VStack>
      </Container>
    </Template.Main>
  );
};

const Title = styled("h1")`
  color: #2d2d2d;
  font-weight: 700;
  text-transform: uppercase;
`;

const Empty = styled("h3")`
  color: #2d2d2d;
  font-size: 2.2rem;
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0.7;
`;
