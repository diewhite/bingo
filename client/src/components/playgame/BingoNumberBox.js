import React, { useState } from "react";
import { styled } from "styled-components";

const Wrap = styled.span`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-color: ${(props) => (props.backColor ? "white" : "gray")};
`;

const BingoNumberBox = ({ children }) => {
  const [isColor, setIsColor] = useState(true);
  const boxColorHandler = () => {
    setIsColor({ backgroundColor: "gray" });
  };
  return (
    <Wrap onClick={() => setIsColor(false)} backColor={isColor}>
      {children}
    </Wrap>
  );
};

export default BingoNumberBox;
