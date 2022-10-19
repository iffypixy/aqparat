import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import {Volunteer} from "@entities/volunteer";
import {request} from "@shared/lib/request";
import {Button, Input} from "@shared/ui/atoms";
import * as React from "react";

interface VolunteerToEventAdditionModalProps {
  open: boolean;
  handleClose: () => void;
  addVol: (event: Volunteer) => void;
  eventId: string;
}

export const VolunteerToEventAdditionModal: React.FC<
  VolunteerToEventAdditionModalProps
> = ({open, handleClose, addVol, eventId}) => {
  const [text, setText] = React.useState("");
  const [vols, setVols] = React.useState<Volunteer[]>([]);

  React.useEffect(() => {
    if (text) {
      request({
        url: "/organisations/:id/volunteers/query",
        method: "GET",
        params: {
          name: text,
        },
      }).then((res) => {
        setVols(res.data.volunteers);
      });
    } else {
      setVols([]);
    }
  }, [text]);

  const handleAddButtonClick = (vol: Volunteer) => {
    addVol(vol);

    request({
      url: `/organisations/events/${eventId}/volunteers/add`,
      method: "POST",
      data: {
        volunteerId: vol.id,
      },
    });

    setVols((vols) => vols.filter((v) => v.id !== vol.id));
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <Wrapper>
        <VStack w="100%" spacing="2rem">
          <Title>Search among your volunteers</Title>

          <ModalBody w="100%">
            <VStack w="100%" spacing="1rem">
              <Input
                placeholder="name"
                value={text}
                onChange={({currentTarget}) => setText(currentTarget.value)}
              />

              {vols.map((vol, idx) => (
                <HStack w="100%" key={idx} justify="space-between">
                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "500",
                      fontSize: "1.3rem",
                    }}
                  >
                    {vol.firstName} {vol.lastName}
                  </Text>

                  <Text
                    onClick={() => handleAddButtonClick(vol)}
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "500",
                      fontSize: "1.3rem",
                      color: "#ff9548",
                      cursor: "pointer",
                    }}
                  >
                    add
                  </Text>
                </HStack>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <CloseButton
              onClick={() => {
                handleClose();
              }}
            >
              close
            </CloseButton>
          </ModalFooter>
        </VStack>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled(ModalContent)`
  max-width: initial;
  width: 50rem;
  background-color: #ffead1;
  padding: 2rem;
`;

const Title = styled(ModalHeader)`
  font-size: 2.2rem;
  text-transform: uppercase;
  margin: auto;
`;

const CloseButton = styled(Button)`
  font-size: 1.4rem;
`;
