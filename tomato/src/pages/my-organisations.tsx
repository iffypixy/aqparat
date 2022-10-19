import * as React from "react";
import {Container, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {useNavigate} from "react-router-dom";

import {Template} from "@shared/ui/templates";
import {Header} from "@widgets/header";
import {Icon} from "@shared/ui/icons";
import {viewerModel} from "@entities/viewer";
import {Organisation} from "@entities/organisation";
import {request} from "@shared/lib/request";

export const MyOrganisationsPage: React.FC = () => {
  const credentials = viewerModel.useCredentials()!;

  const [orgs, setOrgs] = React.useState<Organisation[]>([]);

  React.useEffect(() => {
    request({url: `/volunteers/${credentials.id}/organisations`}).then((res) =>
      setOrgs(res.data.organisations),
    );
  }, []);

  const empty = orgs.length === 0;

  const navigate = useNavigate();

  const handleClick = (orgId: string) => {
    navigate(`/org/${orgId}`);
  };

  return (
    <Template.Main header={<Header />}>
      <Container maxW="container.xl">
        <VStack justify="center" align="center" spacing="5rem" mt="5rem">
          <Title>My organisations</Title>

          <VStack w="100%">
            {!empty && (
              <Org>
                <Stack w="30%">
                  <Key>foundation date</Key>
                </Stack>

                <Stack w="50%">
                  <Key>title</Key>
                </Stack>

                <HStack w="20%" justify="flex-end" />
              </Org>
            )}

            {empty && <Empty>You have no organisations</Empty>}

            <VStack w="100%">
              {orgs.map((org, idx) => (
                <Org key={idx} onClick={() => handleClick(org.id)} interactive>
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

                  <Stack w="50%">
                    <Value>{org.name}</Value>
                  </Stack>

                  <HStack w="20%" justify="flex-end">
                    <RoundedArrowRightIcon />
                  </HStack>
                </Org>
              ))}
            </VStack>
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

interface OrgProps {
  interactive?: boolean;
}

const Org = styled(HStack)<OrgProps>`
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
