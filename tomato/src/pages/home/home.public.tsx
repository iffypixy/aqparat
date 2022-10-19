import * as React from "react";
import styled from "@emotion/styled";
import {Container, HStack, Text, VStack} from "@chakra-ui/react";

import {Header} from "@widgets/header";
import {Template} from "@shared/ui/templates";
import {Button} from "@shared/ui/atoms";

import lock from "@shared/assets/lock.png";

export const HomePublic: React.FC = () => (
  <Template.Main header={<Header />}>
    <Container maxW="container.xl">
      <HStack w="100%" justify="center" mt="6rem">
        <VStack justify="flex-start" align="flex-start" spacing="3rem">
          <Title>The Only Storage for Volunteers’ Achievements</Title>

          <Slogan>Aqparat believes that all efforts should be visible</Slogan>

          {/* <Button>Start now</Button> */}
        </VStack>

        <IMG src={lock} />
      </HStack>
    </Container>
  </Template.Main>
);

const Title = styled("h1")`
  color: #2d2d2d;
  font-size: 6.5rem;
  font-weight: 700;
  line-height: 1.35;
  text-transform: uppercase;
`;

const Slogan = styled(Text)`
  color: #2d2d2d;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 500;
  opacity: 0.65;
`;

const IMG = styled("img")`
  width: 75rem;

  @media only screen and (max-width: 992px) {
    display: none;
  }
`;
