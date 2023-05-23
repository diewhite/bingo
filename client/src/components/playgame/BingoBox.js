import React from "react";
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
const BingoBox = ({ newMessage, isGameChat, isJoinedInfo, leaveRoom }) => {
  console.log(isJoinedInfo, "isJoinedInfo");
  return (
    <Wrap>
      <Title>방제목 : {isJoinedInfo?.room?.title}</Title>
      <InnerWrap>
        <BingoBoard>
          {isJoinedInfo?.bingoBoard?.cell[0].length > 0 &&
            isJoinedInfo?.bingoBoard?.cell[0]?.map((el, index) => {
              return <BingoNumberBox>{el.number}</BingoNumberBox>;
            })}
          {isJoinedInfo?.bingoBoard?.cell[1].length > 0 &&
            isJoinedInfo?.bingoBoard?.cell[1]?.map((el, index) => {
              return <BingoNumberBox>{el.number}</BingoNumberBox>;
            })}
          {isJoinedInfo?.bingoBoard?.cell[2].length > 0 &&
            isJoinedInfo?.bingoBoard?.cell[2]?.map((el, index) => {
              return <BingoNumberBox>{el.number}</BingoNumberBox>;
            })}
          {isJoinedInfo?.bingoBoard?.cell[3].length > 0 &&
            isJoinedInfo?.bingoBoard?.cell[3]?.map((el, index) => {
              return <BingoNumberBox>{el.number}</BingoNumberBox>;
            })}
          {isJoinedInfo?.bingoBoard?.cell[4].length > 0 &&
            isJoinedInfo?.bingoBoard?.cell[4]?.map((el, index) => {
              return <BingoNumberBox>{el.number}</BingoNumberBox>;
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
