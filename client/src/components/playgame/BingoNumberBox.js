import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

const Wrap = styled.span`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-color: ${(props) => (props.backColor ? "white" : "gray")};
  cursor: pointer;
`;

const BingoNumberBox = ({
  children,
  Row,
  Column,
  setIsBingoNumber,
  isBingoNumber,
  checkedBingo,
  setCheckedBingo,
  data,
  isJoinedInfo,
}) => {
  const [isColor, setIsColor] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let memo = isBingoNumber;
    if (!!isClicked) {
      memo[Row][Column] = { isSelected: true, number: data.number };
      setCheckedBingo(memo);
      // console.log("1111");
    }
  }, [isClicked]);
  console.log(isBingoNumber, "isBingoNumber");

  useEffect(() => {
    if (!!isBingoNumber[Row][Column].isSelected) {
      setIsColor(false);
      console.log("2222");
    }
  }, [isClicked]);

  return (
    <Wrap onClick={() => setIsClicked(true)} backColor={isColor}>
      {children}
    </Wrap>
  );
};

export default BingoNumberBox;
