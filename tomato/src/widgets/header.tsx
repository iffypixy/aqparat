import {Heading} from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  OrganisationCredentials,
  viewerModel,
  VolunteerCredentials,
} from "@entities/viewer";
import {Link} from "@shared/ui/atoms";
import * as React from "react";

export const Header: React.FC = () => {
  const credentials = viewerModel.useCredentials();
  const type = viewerModel.useViewerType();

  const profileLink = credentials
    ? type === "organisation"
      ? `/organisations/${credentials.id}`
      : `/volunteers/${credentials.id}`
    : "/login";

  const name = credentials
    ? type === "organisation"
      ? (credentials as OrganisationCredentials).name
      : (credentials as VolunteerCredentials).firstName
    : "Log in";

  return (
    <Wrapper>
      <Left>
        <BurgerSVG viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </BurgerSVG>

        <Heading as="h1" size="2xl">
          Aqparat
        </Heading>

        <Nav>
          <NavLink to="/">Home</NavLink>
          {credentials && type === "organisation" && (
            <NavLink to="/my-volunteers">My volunteers</NavLink>
          )}

          {credentials && type === "volunteer" && (
            <NavLink to="/my-organisations">My organisations</NavLink>
          )}

          {credentials && <NavLink to="/events">My events</NavLink>}
          <NavLink to="/news">News</NavLink>
        </Nav>
      </Left>

      <Right>
        <NavLink
          style={{color: "#FF9548", display: "inline-flex"}}
          to={profileLink}
        >
          {name}
          <SignInSVG
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4.06506"
              y="0.393295"
              width="1.86468"
              height="10.2558"
              rx="0.932341"
            />
            <rect
              x="3.67334"
              y="1.31853"
              width="1.86468"
              height="7.08258"
              rx="0.932341"
              transform="rotate(-45 3.67334 1.31853)"
            />
            <rect
              width="1.86468"
              height="7.06462"
              rx="0.932341"
              transform="matrix(0.707107 0.707107 0.707107 -0.707107 0 5.00815)"
            />
          </SignInSVG>
        </NavLink>
      </Right>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 6rem;
`;

const Left = styled("div")`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 6.5rem;
  }
`;

const Right = styled("div")`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const Nav = styled("nav")`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 4rem;
  }
`;

const BurgerSVG = styled("svg")`
  width: 4rem;
  cursor: pointer;
  transition: 0.05s linear;

  &:active {
    transform: scale(0.9);
    transform-origin: 50% 50%;
  }
`;

const SignInSVG = styled("svg")`
  width: 1.5rem;
  fill: #2d2d2d;
  cursor: pointer;
  margin-left: 1rem;
`;

const NavLink = styled(Link)`
  color: #2d2d2d;
  font-weight: 500;
  font-size: 1.75rem;
`;
