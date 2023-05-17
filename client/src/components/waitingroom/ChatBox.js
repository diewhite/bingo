import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: calc(100%-40px);
  height: 300px;
  background-color: white;
  margin: 0 20px;
  border-radius: 15px;
  border: solid 1px gray;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  div:nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 270px;
    overflow-y: scroll;
  }
  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
  }
  input {
    width: calc(100% - 100px);
  }
  button {
    width: 80px;
  }
`;

const ChatBox = ({
  isChatting,
  setIsChatting,
  newMessage,
  isWatingRoomChat,
}) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [isWatingRoomChat, newMessage]);

  return (
    <Container>
      <div ref={scrollRef}>
        {isWatingRoomChat.map((el, index) => {
          return <span index={index}>{el}</span>;
        })}
      </div>
      <div>
        <input
          onChange={(e) => {
            setIsChatting(e.target.value);
          }}
          placeholder="채팅을 입력하세요"
        ></input>
        <button onClick={() => newMessage(isChatting)}>보내기</button>
      </div>
    </Container>
  );
};

export default ChatBox;
