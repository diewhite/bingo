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
  height: calc(100vh - 100px);
  background-color: #3e7aeb;
  padding: 50px;
  min-width: 800px;
`;

const RoomBoxWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: calc(100% - 40px);
  height: 200px;
  overflow-y: scroll;
  padding: 20px;
  height: 100%;
  /* height: 250px; */
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

const RefreshBtn = styled.button``;

const PlayGame = ({ setIsName, isName }) => {
  let socket = useRef(null);

  const [isCreate, setIsCreate] = useState(false);
  const [isChangeName, setIsChangeName] = useState(false);
  const [isPlayGame, setIsPlayGame] = useState(false);
  const [isChatting, setIsChatting] = useState("");
  const [isWatingRoomChat, setIsWatingRoomChat] = useState([]);
  const [isRoomList, setIsRoomList] = useState([]);
  const [isGameChat, setIsGameChat] = useState([]);
  const [isJoinedInfo, setIsJoinedInfo] = useState("");

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
  }, []);

  const createGameRoom = (title) => {
    setIsPlayGame(true);
    setIsCreate(false);
    socket.current.emit("create", title);
  };

  const newMessage = (text) => {
    socket.current.emit("newMessage", text);
  };

  const joinRoom = (data) => {
    if (data.player1?.length > 0 && data.player2?.length > 0) {
      alert("사람 꽉찼음");
    } else {
      setIsPlayGame(true);
      socket.current.emit("join", data.number);
    }
  };

  const leaveRoom = () => {
    socket.current.emit("leave");
    setIsPlayGame(false);
  };

  useEffect(() => {
    socket.current.on("created", (data) => {
      setIsJoinedInfo(data);
    });
  }, []);

  // console.log(isJoinedInfo, "isJoinedInfo");
  useEffect(() => {
    socket.current.on("roomList", (data) => {
      setIsRoomList(data);
    });
  }, [isRoomList, setIsRoomList]);

  useEffect(() => {
    socket.current.on("onMessage", function (data) {
      setIsWatingRoomChat([...isWatingRoomChat, `${data.name}:${data.text}`]);
      if (!!isPlayGame) {
        setIsGameChat([...isGameChat, `${data.name}:${data.text}`]);
      } else if (!isPlayGame) {
        setIsGameChat([]);
      }
    });
  }, [newMessage]);

  useEffect(() => {
    socket.current.on("check", (data) => {
      console.log(data, "?data");
    });
  }, []);

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
          <RefreshBtn></RefreshBtn>
          <RoomBoxWrap>
            {isRoomList.length > 0 ? (
              isRoomList.map((el, index) => {
                return (
                  <RoomBox key={el} el={el} index={index} joinRoom={joinRoom} />
                );
              })
            ) : (
              <span>방이 없습니다.</span>
            )}
          </RoomBoxWrap>
          <ChatBox
            isChatting={isChatting}
            setIsChatting={setIsChatting}
            newMessage={newMessage}
            isWatingRoomChat={isWatingRoomChat}
            setIsWatingRoomChat={setIsWatingRoomChat}
          ></ChatBox>
          <ButtonWrap>
            <Button onClick={() => setIsCreate(!isCreate)}>방 만들기</Button>
            <Button onClick={() => setIsChangeName(!isChangeName)}>
              닉네임 변경
            </Button>
          </ButtonWrap>
          {isCreate ? (
            <CreateRoom
              createRoom={createGameRoom}
              isOpen={setIsCreate}
              setIsPlayGame={setIsPlayGame}
            ></CreateRoom>
          ) : (
            <></>
          )}
          {isChangeName ? (
            <ChangeName isOpen={setIsChangeName}></ChangeName>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <BingoBox
            newMessage={newMessage}
            isGameChat={isGameChat}
            isJoinedInfo={isJoinedInfo}
            leaveRoom={leaveRoom}
          ></BingoBox>
        </>
      )}
    </Container>
  );
};

export default PlayGame;
