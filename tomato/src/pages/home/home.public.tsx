import * as React from "react";

import {Template} from "@shared/ui/templates";
import {Header} from "@widgets/header";
import styled from "@emotion/styled";
import {Container, Text} from "@chakra-ui/react";
import {Button} from "@shared/ui/atoms";

import lock from "@shared/assets/lock.png";

export const HomePublic: React.FC = () => {
  return (
    <Template.Main header={<Header />}>
      <Container maxW="container.xl">
        <Wrapper>
          <Head>
            <HeadTextBlock>
              <Title>The Only Storage for Volunteers’ Achievements</Title>

              <Slogan>
                Aqparat believes that all efforts should be visible
              </Slogan>

              <Button>Start now</Button>
            </HeadTextBlock>

            <IMG src={lock} />
          </Head>
        </Wrapper>
      </Container>
    </Template.Main>
  );
};

const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Head = styled("div")`
  width: 100%;
  display: flex;
  margin-top: 6rem;
`;

const HeadTextBlock = styled("div")`
  & > :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const Title = styled("h2")`
  font-size: 7.25rem;
  font-weight: 700;
  line-height: 1.35;
`;

const Slogan = styled(Text)`
  color: #2d2d2d;
  font-size: 2.4rem;
`;

const IMG = styled("img")`
  width: 75rem;
`;
