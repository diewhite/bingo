import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(192, 192, 192, 0.7);
`;

const Box = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 200px;
  background-color: #3e7aeb;
  gap: 30px;
  border: solid 1px gray;
  border-radius: 15px;
  input {
    height: 30px;
    width: 350px;
  }
  button {
    height: 35px;
    width: 80px;
  }
  div:nth-child(1) {
    font-size: 30px;
    font-family: "Open Sans";
    color: white;
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2);
  }
  div:nth-child(2) {
    display: flex;
    gap: 5px;
  }
`;

const ReplayModal = ({
  setIsConfirm,
  isJoinedInfo,
  isBingoNumber,
  isClickedBingo,
  leaveRoom,
  setIsBingoNumber,
}) => {
  return (
    <Container>
      <Box>
        <div>
          {isJoinedInfo?.bingoBoard?.result === "WIN" ? "이겼네요" : "졌네요"}
        </div>
        <button
          onClick={() => {
            isClickedBingo({
              //   result: isJoinedInfo?.bingoBoard?.result,
              result: "EMPTY",
              turn: isJoinedInfo?.bingoBoard?.turn,
              cell: isBingoNumber,
              restart: true,
            });
            setIsConfirm(false);
            setIsBingoNumber(isJoinedInfo?.bingoBoard?.cell);
          }}
        >
          다시하기
        </button>
        <button
          onClick={() => {
            leaveRoom();
            setIsBingoNumber(isJoinedInfo?.bingoBoard?.cell);
            setIsConfirm(false);
          }}
        >
          나가기
        </button>
      </Box>
    </Container>
  );
};

export default ReplayModal;
