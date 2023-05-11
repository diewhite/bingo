import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import RoomBox from "../components/waitingroom/RoomBox";
import UserInfo from "../components/waitingroom/UserInfo.js";
import CreateRoom from "../components/waitingroom/CreateRoom";
import ChangeName from "../components/waitingroom/ChangeName";
import ChatBox from "../components/waitingroom/ChatBox";
import BingoBox from "../components/playgame/BingoBox";
import { io } from "socket.io-client";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100vh;
  background-color: #3e7aeb;
  padding: 50px;
  min-width: 800px;
`;

const RoomBoxWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: calc(100% - 40px);

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
  const socket = io("http://localhost:4005/");
  // console.log(socket, "socket");
  // console.log(socket());
  const [isCreate, setIsCreate] = useState(false);
  const [isChangeName, setIsChangeName] = useState(false);
  const [isPlayGame, setIsPlayGame] = useState(false);

  useEffect(() => {
    socket.on("connect", function () {
      console.log("Connected");
      socket.emit("information", "name");
      socket.emit("events", { test: "test" });
      socket.emit("identity", 0, (response) =>
        console.log("Identity:", response)
      );
    });
    socket.on("events", function (data) {
      console.log("event", data);
    });
    socket.on("exception", function (data) {
      console.log("event", data);
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
    socket.on("created", function (data) {
      // const div = document.createElement("div");
      // div.append(data.title);
      // room.append(div);
      console.log(data);
    });
    socket.on("onMessage", function (data) {
      const div = document.createElement("div");
      div.append(data.name + " : " + data.text);
    });
  }, []);
  console.log(socket, "socket");

  /*
  socket.on("connect", function () {
      console.log("Connected");
      socket.emit("information", name);
      socket.emit("events", { test: "test" });
      socket.emit("identity", 0, (response) =>
        console.log("Identity:", response)
      );
    });
    socket.on("events", function (data) {
      console.log("event", data);
    });
    socket.on("exception", function (data) {
      console.log("event", data);
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
    });
    socket.on("created", function (data) {
      // const div = document.createElement("div");
      // div.append(data.title);
      // room.append(div);
      console.log(data);
    });
    socket.on("onMessage", function (data) {
      const div = document.createElement("div");
      div.append(data.name + " : " + data.text);
      chat.append(div);
    });
  */

  function newMessage() {
    socket.emit("newMessage", "아아테스트1");
  }
  function newMessage1() {
    socket.emit("newMessage", "아아테스트2");
  }
  console.log(
    socket.on("onMessage", function (data) {
      console.log(data, "data");
    })
  );
  return (
    <Container>
      <button onClick={() => newMessage()}>1</button>
      <button onClick={() => newMessage1()}>2</button>
      {!isPlayGame ? (
        <>
          <UserInfo></UserInfo>
          <RoomBoxWrap>
            <RoomBox setIsPlayGame={setIsPlayGame} />
            <RoomBox setIsPlayGame={setIsPlayGame} />
            <RoomBox setIsPlayGame={setIsPlayGame} />
            <RoomBox setIsPlayGame={setIsPlayGame} />
            <RoomBox setIsPlayGame={setIsPlayGame} />
          </RoomBoxWrap>
          <ChatBox></ChatBox>
          <ButtonWrap>
            <Button onClick={() => setIsCreate(!isCreate)}>방 만들기</Button>
            <Button onClick={() => setIsChangeName(!isChangeName)}>
              닉네임 변경
            </Button>
          </ButtonWrap>
          {isCreate ? <CreateRoom isOpen={setIsCreate}></CreateRoom> : <></>}
          {isChangeName ? (
            <ChangeName isOpen={setIsChangeName}></ChangeName>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <BingoBox></BingoBox>
        </>
      )}
    </Container>
  );
};

export default PlayGame;
