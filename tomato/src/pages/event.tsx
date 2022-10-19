import * as React from "react";
import {Container, HStack, Text, VStack} from "@chakra-ui/react";
import styled from "@emotion/styled";

import {Template} from "@shared/ui/templates";
import {Header} from "@widgets/header";
import {useParams} from "react-router-dom";
import {Event} from "@entities/event";
import {request} from "@shared/lib/request";
import {Icon} from "@shared/ui/icons";
import {VolunteerToEventAdditionModal} from "@features/add-volunteer-to-event";
import {Volunteer} from "@entities/volunteer";
import {Button} from "@shared/ui/atoms";

export const EventPage: React.FC = () => {
  const {id} = useParams();

  const [event, setEvent] = React.useState<
    (Event & {volunteers: Volunteer[]}) | null
  >(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    request({url: `/organisations/events/${id}`}).then((res) =>
      setEvent(res.data.event),
    );
  }, []);

  const finishEvent = () => {
    request({
      method: "POST",
      url: `/organisations/events/${event?.id}/finish`,
    }).then(() => {
      setEvent({...event, isFinished: true} as any);
    });
  };

  return (
    <Template.Main header={<Header />}>
      <Banner>
        <Title>{event?.name}</Title>
        {event?.isFinished && <Description>Event is finished</Description>}
      </Banner>

      <Container maxW="container.xl">
        <VStack w="60%" spacing="2.5rem" align="flex-start" py="5rem">
          <VStack align="flex-start">
            <Key>About:</Key>
            <Value>{event?.description}</Value>
          </VStack>

          <VStack align="flex-start">
            <Key>Locations:</Key>
            <Value>{event?.places.join(" | ")}</Value>
          </VStack>

          <VStack align="flex-start">
            <HStack>
              <TimeIcon />

              <Key>Date:</Key>
            </HStack>

            <Value>
              {event &&
                new Date(event?.startDate)
                  .toJSON()
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join(".")}
              -{" "}
              {event &&
                new Date(event?.endingDate)
                  .toJSON()
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join(".")}
            </Value>
          </VStack>

          <VStack align="flex-start" spacing="2rem">
            <VStack align="flex-start">
              <Key>Volunteers:</Key>

              <Value>
                {event?.volunteers.length === 0
                  ? "No volunteers"
                  : event?.volunteers
                      .map((vol) => `${vol.firstName} ${vol.lastName}`)
                      .join(", ")}
              </Value>
            </VStack>

            {!event?.isFinished && (
              <PlusIcon onClick={() => setIsModalOpen(true)} />
            )}
            {event && (
              <VolunteerToEventAdditionModal
                eventId={event.id}
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                addVol={(vol) =>
                  setEvent((event) => {
                    if (event) {
                      return {
                        ...event,
                        volunteers: [...event.volunteers, vol],
                      };
                    }

                    return null;
                  })
                }
              />
            )}
          </VStack>

          {!event?.isFinished && (
            <VStack align="flex-start" spacing="2rem">
              <Button onClick={() => finishEvent()}>finish event</Button>
            </VStack>
          )}
        </VStack>
      </Container>
    </Template.Main>
  );
};

const Banner = styled(VStack)`
  width: 100%;
  height: 20rem;
  justify-content: center;
  align-items: center;
  background: url("https://messenger-bucket.s3.eu-central-1.amazonaws.com/holy-mass+1.png");
  background-size: cover;
`;

const Title = styled("h1")`
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const Key = styled(Text)`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const Value = styled(Text)`
  font-size: 1.4rem;
  font-weight: 400;
  text-transform: uppercase;
`;

const TimeIcon = styled(Icon.Time)`
  width: 1rem;
`;

const PlusIcon = styled(Icon.Plus)`
  width: 3rem;
  cursor: pointer;
  fill: #2d2d2d;
`;

const Description = styled("h4")`
  color: #ccc;
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
`;
