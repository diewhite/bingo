import React, { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";

const Wrap = styled.div`
  background-color: #a3daff;
  width: 400px;
  border-radius: 10px;
  /* height: 800px; */
`;
const TopBox = styled.div`
  height: 400px;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: lightgray;
  margin: 20px;
  padding: 20px;
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const BottomBox = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  input {
    border: none;
    padding-left: 10px;
    width: 270px;
    height: 50px;
  }
  button {
    border: none;
    width: 70px;
    height: 55px;
  }
`;
const ButtonBox = styled.div`
  width: 360px;
  padding: 20px;
  /* padding: 20px; */
  display: flex;
  /* gap: 20px; */
  justify-content: space-between;
  /* gap: 20px; */
  button {
    width: 160px;
    height: 40px;
    background-color: #fff;
    border: none;
    font-size: 16px;
    font-weight: 700;
  }
`;
const InGameChatBox = ({ newMessage, isGameChat, isJoinedInfo, leaveRoom }) => {
  const chatRef = useRef();
  const scrollRef = useRef();
  const [isText, setIsText] = useState("");
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      newMessage(isText);
      chatRef.current.value = null;
    }
  };

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [isGameChat]);
  return (
    <Wrap>
      <TopBox ref={scrollRef}>
        {isGameChat.map((el, index) => {
          return <div key={el + `${index}`}>{el}</div>;
        })}
      </TopBox>
      <BottomBox>
        <input
          ref={chatRef}
          onKeyPress={onKeyPress}
          onChange={(e) => setIsText(e.target.value)}
          placeholder="채팅을 입력하세요."
        ></input>
        <button
          onClick={() => {
            newMessage(isText);
            chatRef.current.value = null;
          }}
        >
          보내기
        </button>
      </BottomBox>
      <ButtonBox>
        <button>다시하기</button>
        <button onClick={() => leaveRoom()}>나가기</button>
      </ButtonBox>
    </Wrap>
  );
};

export default InGameChatBox;
