import {css} from "@emotion/react";

const clickfall = css`
  cursor: pointer;
  transition: 0.05s linear;

  &:active {
    transform: scale(0.9);
    transform-origin: 50% 50%;
  }
`;

export const mixins = {
  clickfall,
};
