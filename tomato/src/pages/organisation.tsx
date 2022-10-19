import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Container, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import styled from "@emotion/styled";

import {Organisation} from "@entities/organisation";
import {Template} from "@shared/ui/templates";
import {Header} from "@widgets/header";
import banner1 from "@shared/assets/banners/1.png";
import {request} from "@shared/lib/request";
import {Volunteer} from "@entities/volunteer";
import {Event} from "@entities/event";

export const OrganisationPage: React.FC = () => {
  const {id} = useParams();

  const [org, setOrg] = React.useState<Organisation | null>(null);

  React.useEffect(() => {
    request({url: `/organisations/${id}/profile`}).then((res) =>
      setOrg(res.data.organisation),
    );
  }, []);

  const [events, setEvents] = React.useState<Event[]>([]);
  const [vols, setVols] = React.useState<Volunteer[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    request({url: `/organisations/${id}/volunteers`}).then((res) => {
      setVols(res.data.volunteers);
    });

    request({url: `/organisations/${id}/events`}).then((res) => {
      setEvents(res.data.events);
    });
  }, []);

  return (
    <Template.Main header={<Header />}>
      <Banner>
        <BannerIMG src={banner1} />
      </Banner>

      <Container maxW="container.xl">
        <VStack align="flex-start">
          <Profile spacing="3rem">
            <Avatar>
              <AvatarIMG src={org?.avatar} />
            </Avatar>

            <VStack mb="-10rem !important" align="flex-start">
              <Name>{org?.name}</Name>
              <Age>
                since{" "}
                {org && new Date((org as any).foundationDate).getFullYear()}
              </Age>
            </VStack>
          </Profile>

          <HStack w="100%" justify="space-between" align="flex-start">
            <VStack w="35%" spacing="1.5rem">
              <ContentBlock title="Events">
                <VStack w="100%">
                  {events.length === 0 ? <InfoText>No events</InfoText> : ""}

                  {events.map((event, idx) => (
                    <HStack
                      key={idx}
                      style={{cursor: "pointer"}}
                      onClick={() => {
                        navigate(`/event/${event.id}`);
                      }}
                    >
                      <InfoText>{event.name}</InfoText>
                    </HStack>
                  ))}
                </VStack>
              </ContentBlock>

              <ContentBlock title="Volunteers">
                <VStack w="100%">
                  {vols.length === 0 ? <InfoText>No volunteers</InfoText> : ""}

                  {vols.map((vol, idx) => (
                    <HStack
                      key={idx}
                      style={{cursor: "pointer"}}
                      onClick={() => {
                        navigate(`/vol/${vol.id}`);
                      }}
                    >
                      <InfoText>
                        {vol.firstName} {vol.lastName}
                      </InfoText>
                    </HStack>
                  ))}
                </VStack>
              </ContentBlock>
            </VStack>

            <VStack w="60%" spacing="1.5rem">
              <ContentBlock title="General">
                <VStack w="70%" spacing="1rem" align="center" m="auto">
                  <HStack w="100%" justify="space-between">
                    <InfoText>Number of events: </InfoText>
                    <StatsInfo>{events.length}</StatsInfo>
                  </HStack>

                  <HStack w="100%" justify="space-between">
                    <InfoText>Number of volunteers: </InfoText>
                    <StatsInfo>{vols.length}</StatsInfo>
                  </HStack>

                  <HStack w="100%" justify="space-between">
                    <InfoText>Hours volunteered: </InfoText>
                    <StatsInfo>0</StatsInfo>
                  </HStack>
                </VStack>
              </ContentBlock>

              <ContentBlock title="Photos from events">
                <VStack w="100%">
                  <InfoText>No photos</InfoText>
                </VStack>
              </ContentBlock>
            </VStack>
          </HStack>
        </VStack>
      </Container>
    </Template.Main>
  );
};

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
  box-shadow: 0 0 10px 5px #2d2d2d;
`;

const AvatarIMG = styled("img")`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
`;

const Profile = styled(HStack)`
  transform: translateY(-50%);
`;

const Name = styled(Text)`
  font-size: 3.6rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const Age = styled(Text)`
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0.7;
`;

const InfoText = styled(Text)`
  font-size: 1.3rem;
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0.65;
`;

const StatsInfo = styled(Text)`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const Block = styled(VStack)`
  min-height: 10rem;
  background-color: #ffe0ba;
  border: 1px solid #2d2d2d;
  border-radius: 1rem;
  padding: 2rem;
`;

const BlockTitle = styled(Text)`
  color: #2d2d2d;
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;
`;

interface ContentBlockProps {
  title: string;
  children: React.ReactNode;
}

const ContentBlock: React.FC<ContentBlockProps> = ({title, children}) => (
  <Block w="100%" spacing="3rem">
    <BlockTitle>{title}</BlockTitle>

    <Stack w="100%">{children}</Stack>
  </Block>
);
