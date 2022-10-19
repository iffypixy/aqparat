import * as React from "react";
import {
  HStack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import {
  OrganisationCredentials,
  viewerModel,
  VolunteerCredentials,
} from "@entities/viewer";
import {mixins} from "@shared/lib/styling";
import {Link} from "@shared/ui/atoms";
import {Icon} from "@shared/ui/icons";
import {request} from "@shared/lib/request";

export const Header: React.FC = () => {
  const credentials = viewerModel.useCredentials();
  const type = viewerModel.useViewerType();

  const profileLink = credentials
    ? type === "organisation"
      ? `/org/${credentials.id}`
      : `/vol/${credentials.id}`
    : "/login";

  const name = credentials
    ? type === "organisation"
      ? (credentials as OrganisationCredentials).name
      : (credentials as VolunteerCredentials).firstName
    : "Log in";

  return (
    <Wrapper>
      <HStack spacing="12rem">
        <Title>Aqparat</Title>

        <HStack spacing="4.5rem">
          <NavLink to="/">Home</NavLink>
          {credentials && type === "organisation" && (
            <NavLink to="/my-vols">My volunteers</NavLink>
          )}

          {credentials && type === "volunteer" && (
            <NavLink to="/my-orgs">My organisations</NavLink>
          )}

          {credentials && <NavLink to="/my-events">My events</NavLink>}
          <NavLink to="/news">News</NavLink>
        </HStack>
      </HStack>

      <HStack spacing="2rem">
        {window["invites"] && (
          <Popover>
            <PopoverTrigger>
              <HStack sx={{position: "relative"}}>
                <BellIcon />

                {window["invites"] && (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "red",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}
                  >
                    {window["invites"].length}
                  </Text>
                )}
              </HStack>
            </PopoverTrigger>

            <Invites>
              <InvitesTitle>New invitations</InvitesTitle>

              <PopoverBody>
                <VStack>
                  {window["invites"]?.map((invite, idx) => (
                    <HStack key={idx} w="100%" justify="space-between">
                      <Text
                        style={{
                          textTransform: "uppercase",
                          fontSize: "1.4rem",
                          fontWeight: "500",
                        }}
                      >
                        {invite.organisation.name}
                      </Text>

                      <HStack spacing="1rem">
                        <TickIcon
                          onClick={() => {
                            request({
                              url: "/organisations/invitations/accept",
                              method: "POST",
                              data: {
                                id: invite.id,
                              },
                            });

                            window["invites"] = window["invites"].filter(
                              (i) => i.id !== invite.id,
                            );
                          }}
                        />
                        <CrossIcon />
                      </HStack>
                    </HStack>
                  ))}
                </VStack>
              </PopoverBody>
            </Invites>
          </Popover>
        )}

        <ProfileLink to={profileLink}>
          {name}

          <ArrowUpIcon />
        </ProfileLink>
      </HStack>
    </Wrapper>
  );
};

const Wrapper = styled(HStack)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 10px 5px #2d2d2d;
  padding: 2rem 10rem;
`;

const Title = styled("h1")`
  color: #2d2d2d;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  text-transform: uppercase;
  user-select: none;
  transition: 0.2s linear;

  &:hover {
    color: #ff9548;
  }

  ${mixins.clickfall}
`;

const ArrowUpIcon = styled(Icon.ArrowUp)`
  width: 1.5rem;
  fill: #2d2d2d;
  transition: 0.2s linear;
  margin-left: 1rem;
`;

const NavLink = styled(Link)`
  color: #2d2d2d;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  font-size: 1.4rem;
  text-transform: uppercase;
  transition: 0.2s linear;

  &:hover {
    color: #ff9548;
  }
`;

const ProfileLink = styled(NavLink)`
  color: #ff9548;
  display: inline-flex;

  &:hover {
    & > svg {
      fill: #ff9548;
    }
  }
`;

const BellIcon = styled(Icon.Bell)`
  width: 2rem;
  fill: #ff9548;
  cursor: pointer;
`;

const Invites = styled(PopoverContent)`
  width: 35rem !important;
  background-color: #ffe0ba;
  padding: 1rem;
`;

const InvitesTitle = styled(PopoverHeader)`
  font-weight: 700;
  font-size: 2.2rem;
  text-transform: uppercase;
  margin: auto;
  text-align: center;
  border-bottom: none;
`;

const TickIcon = styled(Icon.Tick)`
  width: 2rem;
  fill: green;
  cursor: pointer;
`;

const CrossIcon = styled(Icon.Cross)`
  width: 1.5rem;
  fill: red;
  cursor: pointer;
`;
