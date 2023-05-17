import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import RoomBox from "../components/waitingroom/RoomBox";
import UserInfo from "../components/waitingroom/UserInfo.js";
import CreateRoom from "../components/waitingroom/CreateRoom";
import ChangeName from "../components/waitingroom/ChangeName";
import ChatBox from "../components/waitingroom/ChatBox";
import BingoBox from "../components/playgame/BingoBox";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

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

const PlayGame = ({ setIsName, isName }) => {
  let socket = useRef(null);

  const [isCreate, setIsCreate] = useState(false);
  const [isChangeName, setIsChangeName] = useState(false);
  const [isPlayGame, setIsPlayGame] = useState(false);
  const [isChatting, setIsChatting] = useState("");
  const [isWatingRoomChat, setIsWatingRoomChat] = useState([]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:4005/");

      socket.current.on("connect", function () {
        console.log("Connected");
        socket.current.emit("information", isName);
        socket.current.emit("events", { isName: "test" });
        socket.current.emit("identity", 0, (response) =>
          console.log("Identity:", response)
        );
      });
    }
  });

  const newMessage = (text) => {
    socket.current.emit("newMessage", text);
    text = "";
  };

  useEffect(() => {
    socket.current.on("onMessage", function (data) {
      setIsWatingRoomChat([...isWatingRoomChat, `${data.name}:${data.text}`]);
    });

    console.log(isWatingRoomChat, "isWatingRoom");
  }, [newMessage]);

  const navigate = useNavigate();
  useEffect(() => {
    if (isName.length === 0) {
      navigate("/");
    }
  }, []);
  return (
    <Container>
      {!isPlayGame ? (
        <>
          <UserInfo isName={isName}></UserInfo>
          <RoomBoxWrap>
            <RoomBox setIsPlayGame={setIsPlayGame} />
            <RoomBox setIsPlayGame={setIsPlayGame} />
            <RoomBox setIsPlayGame={setIsPlayGame} />
            <RoomBox setIsPlayGame={setIsPlayGame} />
            <RoomBox setIsPlayGame={setIsPlayGame} />
          </RoomBoxWrap>
          <ChatBox
            isChatting={isChatting}
            setIsChatting={setIsChatting}
            newMessage={newMessage}
            isWatingRoomChat={isWatingRoomChat}
          ></ChatBox>
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
