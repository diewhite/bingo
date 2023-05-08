import React from "react";
import { styled } from "styled-components";
import RoomBox from "../components/waitingroom/RoomBox.js";
import UserInfo from "../components/waitingroom/UserInfo.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* width: ; */
  height: 100vh;
  background-color: #3e7aeb;
  padding: 50px;
`;

const RoomBoxWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* overflow-y: scroll; */
  gap: 10px;
  width: calc(100% - 40px);
  /* height: 400px; */
  /* background-color: white; */
  padding: 20px;
`;
const ButtonWrap = styled.div`
  display: flex;
  padding-left: 20px;
  gap: 20px;
`;
const Button = styled.button`
  background: #a3daff;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  width: 273px;
  height: 63px;
  border-radius: 15px;
  font-weight: 700;
  font-size: 30px;
`;

const PlayGame = () => {
  return (
    <Container>
      <UserInfo></UserInfo>
      <RoomBoxWrap>
        <RoomBox />
        <RoomBox />
        <RoomBox />
        <RoomBox />
        <RoomBox />
        <RoomBox />
        <RoomBox />
      </RoomBoxWrap>
      <ButtonWrap>
        <Button>방 만들기</Button>
        <Button>닉네임 변경</Button>
      </ButtonWrap>
    </Container>
  );
};

export default PlayGame;
