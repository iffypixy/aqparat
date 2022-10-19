import * as React from "react";
import {Container, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import {css} from "@emotion/react";
import styled from "@emotion/styled";

import {Icon} from "@shared/ui/icons";
import {Template} from "@shared/ui/templates";
import {Header} from "@widgets/header";
import {request} from "@shared/lib/request";
import {viewerModel} from "@entities/viewer";
import {Event as TEvent} from "@entities/event";
import {EventAdditionModal} from "@features/add-event";
import {useNavigate} from "react-router-dom";

export const MyEventsPage: React.FC = () => {
  const credentials = viewerModel.useCredentials()!;
  const type = viewerModel.useViewerType();

  const navigate = useNavigate();

  const [events, setEvents] = React.useState<TEvent[]>([]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    request({url: `/${type}s/${credentials.id}/events`}).then((res) =>
      setEvents(res.data.events),
    );
  }, []);

  const empty = events.length === 0;

  const addEvent = (event: TEvent) => {
    setEvents((events) => [...events, event]);
  };

  return (
    <Template.Main header={<Header />}>
      <Container maxW="container.xl">
        <VStack justify="center" align="center" spacing="5rem" mt="5rem">
          <Title>My events</Title>

          <VStack w="100%">
            {!empty && (
              <Event>
                <Stack w="35%">
                  <Key>title</Key>
                </Stack>

                <Stack w="20%">
                  <Key>Start date</Key>
                </Stack>

                <Stack w="20%">
                  <Key>Ending date</Key>
                </Stack>

                <HStack w="25%" justify="flex-end" />
              </Event>
            )}

            {empty && <Empty>You have no events</Empty>}

            <VStack w="100%">
              {events.map((event, idx) => (
                <Event
                  key={idx}
                  interactive
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <Stack w="35%">
                    <Value>{event.name}</Value>
                  </Stack>

                  <Stack w="20%">
                    <Value>
                      {new Date(event.startDate)
                        .toJSON()
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(".")}
                    </Value>
                  </Stack>

                  <Stack w="20%">
                    <Value>
                      {new Date(event.endingDate)
                        .toJSON()
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(".")}
                    </Value>
                  </Stack>

                  <HStack w="25%" justify="flex-end">
                    <RoundedArrowRightIcon />
                  </HStack>
                </Event>
              ))}
            </VStack>

            {type === "organisation" && (
              <HStack w="100%" justify="center" mt="10rem !important">
                <PlusIcon onClick={() => setIsModalOpen(true)} />

                <EventAdditionModal
                  addEvent={addEvent}
                  open={isModalOpen}
                  handleClose={() => setIsModalOpen(false)}
                />
              </HStack>
            )}
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

const PlusIcon = styled(Icon.Plus)`
  fill: #2d2d2d;
  width: 3rem;
  cursor: pointer;

  &:hover {
    fill: #fdb25a;
  }
`;
