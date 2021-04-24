import React from "react";
import { Spin } from "antd";
import styled, { css } from "styled-components";

interface SpinnerProps {
  minHeight?: number;
}

const SpinnerConainer = styled.div<SpinnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  ${(props) => css`
    min-height: ${props.minHeight}px;
  `}
`;

export const Spinner: React.FC<SpinnerProps> = ({ minHeight = 270 }) => {
  return (
    <SpinnerConainer minHeight={minHeight}>
      <Spin />
    </SpinnerConainer>
  );
};

export default Spinner;
