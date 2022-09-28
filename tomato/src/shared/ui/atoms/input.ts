import {Input as I} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Input = styled(I)`
  color: #000000;
  font-size: 1.6rem;
  border-bottom: 2px solid #6c6c6c;
  padding: 2rem 0;

  &::placeholder {
    color: #747474;
    opacity: 0.65;
  }

  &:focus-visible {
    border-color: #6c6c6c;
    box-shadow: none;
  }
`;
