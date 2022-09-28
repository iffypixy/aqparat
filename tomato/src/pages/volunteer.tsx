import {Container, Text} from "@chakra-ui/react";
import styled from "@emotion/styled";
import {volunteerModel} from "@entities/volunteer";
import {useDispatch} from "@shared/lib/store";
import {Template} from "@shared/ui/templates";
import {Header} from "@widgets/header";
import * as React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import banner1 from "@shared/assets/banners/1.png";

export const VolunteerPage: React.FC = () => {
  const dispatch = useDispatch();

  const volunteer = useSelector(volunteerModel.selectors.volunteer);

  const {id} = useParams();

  React.useEffect(() => {
    dispatch(volunteerModel.actions.fetchVolunteer({id: id!}));
  }, []);

  return (
    <Template.Main header={<Header />}>
      <Banner>
        <BannerIMG src={banner1} />
      </Banner>

      <Container maxW="container.xl">
        <Wrapper>
          <Info>
            <Avatar>
              <AvatarIMG src={volunteer?.avatar} />
            </Avatar>

            <Name>
              {volunteer?.firstName} {volunteer?.lastName}
            </Name>
          </Info>

          <Bottom>
            <BLeft>
              <Block>
                <BlockTitle>Pinned events</BlockTitle>

                <Text>No pinned events</Text>
              </Block>

              <Block>
                <BlockTitle>Future events</BlockTitle>

                <Text>No future events</Text>
              </Block>
            </BLeft>

            <BRight>
              <Block>
                <BlockTitle>Information</BlockTitle>

                <Stats>
                  <Text>Number of events: 0</Text>
                  <Text>Number of organizations: 0</Text>
                  <Text>Hours volunteered: 0</Text>
                </Stats>
              </Block>

              <Block>
                <BlockTitle>Photos from events</BlockTitle>

                <Text>No photos</Text>
              </Block>
            </BRight>
          </Bottom>
        </Wrapper>
      </Container>
    </Template.Main>
  );
};

const Wrapper = styled("div")`
  & > :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const Banner = styled("div")`
  width: 100%;
  height: 20rem;
`;

const BannerIMG = styled("img")`
  width: 100%;
  height: 100%;
`;

const Avatar = styled("div")`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  box-shadow: 0 0 1px 5px #000;
  transform: translateY(-50%);
`;

const AvatarIMG = styled("img")`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Info = styled("div")`
  display: flex;
  align-items: flex-start;
  margin-bottom: -3rem !important;
`;

const Name = styled(Text)`
  font-size: 3.2rem;
  font-weight: 500;
  margin-top: 3rem;
  margin-left: 4rem;
`;

const Bottom = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const BLeft = styled("div")`
  width: 25%;

  & > :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const BRight = styled("div")`
  width: 70%;

  & > :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const Block = styled("div")`
  border-radius: 2rem;
  min-height: 10rem;
  background-color: #ffe0ba;
  padding: 2rem;

  & > :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const BlockTitle = styled("h3")`
  color: #2d2d2d;
  font-weight: 500;
  font-size: 2rem;
`;

const Stats = styled("div")`
  display: flex;
  flex-direction: column;

  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;
