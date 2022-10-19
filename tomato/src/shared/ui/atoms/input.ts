import {Input as I, Textarea as TA} from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Input = styled(I)`
  color: #2d2d2d;
  font-size: 1.4rem;
  font-weight: 500;
  border-color: #2d2d2d;
  border-bottom: 2px solid #2d2d2d;
  text-transform: uppercase;
  padding: 2rem 1.5rem;

  &::placeholder {
    color: #747474;
    opacity: 0.65;
  }

  &:focus-visible {
    border-color: #6c6c6c;
    box-shadow: none;
  }
`;

export const Textarea = styled(TA)`
  color: #2d2d2d;
  font-size: 1.4rem;
  height: 15rem;
  font-weight: 500;
  border-color: #2d2d2d;
  border-bottom: 2px solid #2d2d2d;
  text-transform: uppercase;

  &::placeholder {
    color: #747474;
    opacity: 0.65;
  }

  &:focus-visible {
    border-color: #6c6c6c;
    box-shadow: none;
  }
`;
