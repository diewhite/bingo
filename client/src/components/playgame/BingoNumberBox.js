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
  isPlayGame,
}) => {
  const [isColor, setIsColor] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    if (isPlayGame === false) {
      setIsColor(true);
    }
  }, [isPlayGame]);

  // useEffect(() => {
  //   let memo = isBingoNumber;
  //   if (!!isClicked) {
  //     memo[Row][Column] = { number: data.number, isSelected: true };
  //     setCheckedBingo(memo);
  //   }
  // }, [isClicked]);

  // useEffect(() => {
  //   if (!!isBingoNumber[Row][Column]?.isSelected) {
  //     setIsColor(false);
  //   }
  // }, [isClicked, isPlayGame]);
  console.log(isJoinedInfo, "isJoiendInfo");

  const boxClickHandler = () => {
    let memo = isBingoNumber;
    memo[Row][Column] = { number: data.number, isSelected: true };
    setCheckedBingo(memo);
    if (
      isClicked === false &&
      !data?.isSelected &&
      !!isJoinedInfo?.bingoBoard?.turn
    ) {
      setIsClicked(true);
      setIsColor(false);
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
