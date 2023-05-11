import React from "react";
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

const ChatBox = () => {
  return (
    <Container>
      <div>
        <span>장솬: 아아아</span>
        <span>규민: 어오오오오</span>
      </div>
      <div>
        <input placeholder="채팅을 입력하세요"></input>
        <button>보내기</button>
      </div>
    </Container>
  );
};

export default ChatBox;
