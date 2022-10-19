import * as React from "react";
import {Container, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import {css} from "@emotion/react";
import styled from "@emotion/styled";

import {Icon} from "@shared/ui/icons";
import {Template} from "@shared/ui/templates";
import {Header} from "@widgets/header";
import {request} from "@shared/lib/request";
import {viewerModel} from "@entities/viewer";
import {Volunteer} from "@entities/volunteer";
import {Input} from "@shared/ui/atoms";
import {useNavigate} from "react-router-dom";

export const MyVolunteersPage: React.FC = () => {
  const credentials = viewerModel.useCredentials()!;

  const navigate = useNavigate();

  const [vols, setVols] = React.useState<Volunteer[]>([]);

  React.useEffect(() => {
    request({url: `/organisations/${credentials.id}/volunteers`}).then((res) =>
      setVols(res.data.volunteers),
    );
  }, []);

  const empty = vols.length === 0;

  return (
    <Template.Main header={<Header />}>
      <Container maxW="container.xl">
        <VStack justify="center" align="center" spacing="5rem" mt="5rem">
          <Title>My volunteers</Title>

          <VStack w="100%">
            {!empty && (
              <Event>
                <Stack w="50%">
                  <Key>FIO</Key>
                </Stack>

                <Stack w="30%">
                  <Key>Date of birth</Key>
                </Stack>

                <HStack w="20%" justify="flex-end" />
              </Event>
            )}

            {empty && <Empty>You have no volunteers</Empty>}

            <VStack w="100%">
              {vols.map((volunteer, idx) => (
                <Event
                  key={idx}
                  interactive
                  onClick={() => navigate(`/vol/${volunteer.id}`)}
                >
                  <Stack w="50%">
                    <Value>{`${volunteer.firstName} ${volunteer.lastName}`}</Value>
                  </Stack>

                  <Stack w="30%">
                    <Value>
                      {new Date()
                        .toJSON()
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(".")}
                    </Value>
                  </Stack>

                  <HStack w="20%" justify="flex-end">
                    <RoundedArrowRightIcon />
                  </HStack>
                </Event>
              ))}
            </VStack>

            <VolunteerSearch />
          </VStack>
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

const RoundedArrowRightIcon = styled(Icon.RoundedArrowRight)`
  width: 2rem;
  cursor: pointer;
`;

const InviteBlock = styled(VStack)`
  margin-top: 10rem !important;
  border-top: 2px solid #2d2d2d;
  padding-top: 2rem;
`;

const Helper = styled(Text)`
  font-weight: 500;
  font-size: 1.4rem;
  text-transform: uppercase;
`;

const Empty = styled("h3")`
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0.6;
`;

interface EventProps {
  interactive?: boolean;
}

const Event = styled(HStack)<EventProps>`
  width: 100%;
  border-bottom: 2px solid #ffe0ba;
  transition: 0.2s linear;
  cursor: pointer;
  padding: 2rem 0;

  ${({interactive}) =>
    interactive &&
    css`
      &:hover {
        padding-left: 1rem;
        background-color: #ffe0ba;
      }
    `}
`;

const Value = styled(Text)`
  font-size: 1.4rem;
  text-transform: uppercase;
`;

const Key = styled(Text)`
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const VolunteerSearch: React.FC = () => {
  const [text, setText] = React.useState("");
  const [vols, setVols] = React.useState<Volunteer[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (text) {
      request({
        url: "/volunteers/query",
        params: {
          name: text,
        },
      }).then((res) => {
        console.log(res);

        setVols(res.data.volunteers);
      });
    } else {
      setVols([]);
    }
  }, [text]);

  const handleSendInviteButtonClick = (volunteerId: string) => {
    request({
      url: "/organisations/volunteers/add",
      method: "POST",
      data: {
        volunteerId,
      },
    });
  };

  return (
    <InviteBlock spacing="1rem">
      <Helper>You can invite volunteers to join you</Helper>
      <Input
        placeholder="Aibek Maratov"
        value={text}
        onChange={({currentTarget}) => setText(currentTarget.value)}
      />

      <VStack w="100%">
        {vols.map((vol, idx) => (
          <HStack key={idx} w="100%" justify="space-between">
            <FoundName onClick={() => navigate(`/vol/${vol.id}`)}>
              {vol.firstName} {vol.lastName}
            </FoundName>

            <InviteIcon onClick={() => handleSendInviteButtonClick(vol.id)} />
          </HStack>
        ))}
      </VStack>
    </InviteBlock>
  );
};

const InviteIcon = styled(Icon.Invite)`
  width: 2rem;
  fill: #2d2d2d;
  cursor: pointer;
  transition: 0.2s linear;

  &:hover {
    fill: #fdb25a;
  }
`;

const FoundName = styled(Text)`
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
`;
