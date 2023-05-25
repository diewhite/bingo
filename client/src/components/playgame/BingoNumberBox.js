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
  isClickedBingo,
}) => {
  const [isColor, setIsColor] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let memo = isBingoNumber;
    if (!!isClicked) {
      memo[Row][Column] = { isSelected: true, number: data.number };
      setCheckedBingo(memo);
      console.log(isBingoNumber, "isBingoNumber");
      console.log(isJoinedInfo, "isJoinedInfo");
    }
  }, [isClicked]);

  useEffect(() => {
    if (!!isBingoNumber[Row][Column]?.isSelected) {
      setIsColor(false);
    }
  }, [isClicked]);

  const boxClickHandler = () => {
    if (isClicked === false) {
      setIsClicked(true);
      isClickedBingo({
        result: isJoinedInfo?.bingoBoard?.result,
        turn: isJoinedInfo?.bingoBoard?.turn,
        cell: checkedBingo,
      });
    }
  };
  return (
    <Wrap
      onClick={() => {
        boxClickHandler();
      }}
      backColor={isColor}
    >
      {children}
    </Wrap>
  );
};

export default BingoNumberBox;
