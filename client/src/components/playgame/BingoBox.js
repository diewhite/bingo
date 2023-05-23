import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import BingoNumberBox from "./BingoNumberBox";
import InGameChatBox from "./InGameChatBox";

const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const BingoBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  /* height: 800px; */
  gap: 5px;
  flex-wrap: wrap;
`;
const Title = styled.div`
  margin: 20px;
  font-size: 30px;
  color: #fff;
  font-weight: 700;
`;
const InnerWrap = styled.div`
  margin: 0 auto;
  display: flex;
`;
const BingoBox = ({
  newMessage,
  isGameChat,
  isJoinedInfo,
  leaveRoom,
  isClickedBingo,
}) => {
  const [isBingoNumber, setIsBingoNumber] = useState([]);
  const [checkedBingo, setCheckedBingo] = useState([]);
  console.log(isJoinedInfo, "isJoinedInfo");
  console.log(isBingoNumber, "isBingoNumber");
  useEffect(() => {
    if (!!isJoinedInfo) {
      setIsBingoNumber(isJoinedInfo.bingoBoard.cell);
    }
  }, [isJoinedInfo, isBingoNumber, checkedBingo, isClickedBingo]);
  console.log(isJoinedInfo, "isJoinedInfo");
  // console.log(isBingoNumber, "isBingoNumber");
  useEffect(() => {
    isClickedBingo({
      result: isJoinedInfo?.bingoBoard?.result,
      turn: isJoinedInfo?.bingoBoard?.turn,
      cell: checkedBingo,
    });
  }, [checkedBingo, isBingoNumber, isJoinedInfo]);

  return (
    <Wrap>
      <Title>방제목 : {isJoinedInfo?.room?.title}</Title>
      <InnerWrap>
        <BingoBoard>
          {!!isBingoNumber &&
            isBingoNumber.map((el1, index1) => {
              return el1.map((el2, index2) => {
                return (
                  <BingoNumberBox
                    setIsBingoNumber={setIsBingoNumber}
                    isBingoNumber={isBingoNumber}
                    checkedBingo={checkedBingo}
                    setCheckedBingo={setCheckedBingo}
                    key={el2}
                    Row={index1}
                    Column={index2}
                    data={el2}
                    isJoinedInfo={isJoinedInfo}
                  >
                    {el2.number}
                  </BingoNumberBox>
                );
              });
            })}
        </BingoBoard>
        <InGameChatBox
          leaveRoom={leaveRoom}
          newMessage={newMessage}
          isGameChat={isGameChat}
          isJoinedInfo={isJoinedInfo}
        ></InGameChatBox>
      </InnerWrap>
    </Wrap>
  );
};

export default BingoBox;
