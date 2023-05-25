import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import BingoNumberBox from "./BingoNumberBox";
import InGameChatBox from "./InGameChatBox";
import ReplayModal from "./ReplayModal";

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
  isPlayGame,
}) => {
  const [isBingoNumber, setIsBingoNumber] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  useEffect(() => {
    if (
      isJoinedInfo?.bingoBoard?.result === "WIN" ||
      isJoinedInfo?.bingoBoard?.result === "LOSE"
    ) {
      setIsConfirm(true);
    } else {
      setIsConfirm(false);
    }
  }, [isJoinedInfo]);
  // console.log(
  //   isJoinedInfo?.bingoBoard?.result,
  //   " isJoinedInfo?.bingoBoard?.result"
  // );
  // console.log(isJoinedInfo, "isJoinedInfo");
  useEffect(() => {
    if (!!isJoinedInfo) {
      setIsBingoNumber(isJoinedInfo?.bingoBoard?.cell);
    }
  }, [isJoinedInfo, isBingoNumber, isClickedBingo]);
  return (
    <>
      <Wrap>
        <Title>방제목 : {isJoinedInfo?.room?.title}</Title>
        <InnerWrap>
          <BingoBoard>
            {!!isBingoNumber &&
              isBingoNumber.map((el1, index1) => {
                return el1.map((el2, index2) => {
                  return (
                    <BingoNumberBox
                      key={`${index1}` - `${index2}`}
                      isClickedBingo={isClickedBingo}
                      setIsBingoNumber={setIsBingoNumber}
                      isBingoNumber={isBingoNumber}
                      Row={index1}
                      Column={index2}
                      data={el2}
                      isJoinedInfo={isJoinedInfo}
                      isPlayGame={isPlayGame}
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
      {isConfirm && (
        <ReplayModal
          setIsConfirm={setIsConfirm}
          isJoinedInfo={isJoinedInfo}
          isBingoNumber={isBingoNumber}
          isClickedBingo={isClickedBingo}
          leaveRoom={leaveRoom}
          setIsBingoNumber={setIsBingoNumber}
        ></ReplayModal>
      )}
    </>
  );
};
// isClickedBingo({
//   result: isJoinedInfo?.bingoBoard?.result,
//   // result: "EMPTY",
//   turn: isJoinedInfo?.bingoBoard?.turn,
//   cell: isBingoNumber,
//   restart: true,
// });

export default BingoBox;
