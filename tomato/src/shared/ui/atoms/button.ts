import {Button as B} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Button = styled(B)`
  color: #fff;
  font-size: 1.6rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  height: auto;
  background-color: #fdb25a;
  border-radius: 5px;
  padding: 1.5rem 2.5rem;

  &:disabled {
    background-color: #fdb25a;

    &:hover {
      background-color: #fdb25a;
    }
  }

  &:hover {
    background-color: #fdb25a;
  }
`;
