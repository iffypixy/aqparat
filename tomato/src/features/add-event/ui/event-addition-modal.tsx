import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import {Button, Input} from "@shared/ui/atoms";
import {Textarea} from "@shared/ui/atoms/input";
import styled from "@emotion/styled";
import * as React from "react";
import {request} from "@shared/lib/request";
import {Event} from "@entities/event";
import {TagsInput} from "react-tag-input-component";

interface EventAdditionModalProps {
  open: boolean;
  handleClose: () => void;
  addEvent: (event: Event) => void;
}

interface FormData {
  name: string;
  startDate: string;
  endingDate: string;
  description: string;
}

export const EventAdditionModal: React.FC<EventAdditionModalProps> = ({
  open,
  handleClose,
  addEvent,
}) => {
  const [form, setForm] = React.useState<FormData>({
    name: "",
    startDate: "",
    endingDate: "",
    description: "",
  });

  const [selected, setSelected] = React.useState<string[]>([]);

  const handleCreateButtonClick = () => {
    request({
      url: "/organisations/events/create",
      method: "POST",
      data: {
        name: form.name,
        places: selected,
        startDate: new Date(form.startDate),
        endingDate: new Date(form.endingDate),
        description: form.description,
      },
    }).then((res) => {
      addEvent(res.data.event);
    });
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <Wrapper>
        <VStack w="100%" spacing="2rem">
          <Title>Create event</Title>

          <ModalCloseButton />

          <ModalBody w="100%">
            <form>
              <VStack w="100%" spacing="1rem">
                <Input
                  placeholder="Title"
                  value={form.name}
                  onChange={({currentTarget}) =>
                    setForm((form) => ({...form, name: currentTarget.value}))
                  }
                />
                <Input
                  placeholder="Starting date"
                  type="date"
                  value={form.startDate}
                  onChange={({currentTarget}) =>
                    setForm((form) => ({
                      ...form,
                      startDate: currentTarget.value,
                    }))
                  }
                />
                <Input
                  placeholder="Ending date"
                  type="date"
                  value={form.endingDate}
                  onChange={({currentTarget}) =>
                    setForm((form) => ({
                      ...form,
                      endingDate: currentTarget.value,
                    }))
                  }
                />

                <Tags
                  value={selected}
                  onChange={setSelected}
                  name="locations"
                  placeHolder="enter locations"
                />

                <Textarea
                  placeholder="Description"
                  sx={{resize: "none"}}
                  value={form.description}
                  onChange={({currentTarget}) =>
                    setForm((form) => ({
                      ...form,
                      description: currentTarget.value,
                    }))
                  }
                />
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <CloseButton
              onClick={() => {
                handleCreateButtonClick();
                handleClose();
              }}
            >
              create
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
  font-size: 2.6rem;
  text-transform: uppercase;
  margin: auto;
`;

const CloseButton = styled(Button)`
  font-size: 1.4rem;
`;

const Tags = styled(TagsInput)``;
