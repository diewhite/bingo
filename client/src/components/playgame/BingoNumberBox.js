import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

const Wrap = styled.span`
  width: 100px;
  height: 100px;
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
  data,
  isJoinedInfo,
  isClickedBingo,
  isPlayGame,
}) => {
  const [isColor, setIsColor] = useState(true);

  const boxClickHandler = () => {
    let memo = isBingoNumber;
    memo[Row][Column] = { number: data.number, isSelected: true };
    setIsBingoNumber(memo);
    if (!data?.isSelected && !!isJoinedInfo?.bingoBoard?.turn) {
      setIsColor(false);
      isClickedBingo({
        result: isJoinedInfo?.bingoBoard?.result,
        turn: isJoinedInfo?.bingoBoard?.turn,
        cell: isBingoNumber,
        restart: false,
      });
    }
    setIsBingoNumber(isJoinedInfo?.bingoBoard?.cell);
    console.log("클릭");
  };
  useEffect(() => {
    if (isBingoNumber[Row][Column]?.isSelected) {
      setIsColor(false);
    } else {
      setIsColor(true);
    }
  }, [isBingoNumber, isJoinedInfo]);

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
