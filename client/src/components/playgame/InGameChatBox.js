import React from "react";
import { styled } from "styled-components";

const Wrap = styled.div`
  background-color: #a3daff;
  width: 400px;
  border-radius: 10px;
  /* height: 800px; */
`;
const TopBox = styled.div`
  height: 70%;
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
    padding-left: 10px;
    width: 270px;
    height: 50px;
  }
  button {
    width: 70px;
    height: 55px;
  }
`;
const InGameChatBox = () => {
  return (
    <Wrap>
      <TopBox>
        <div>규민: ㄱㄱㄱ</div>
        <div>장솬: ㄱㄱㄱ</div>
      </TopBox>
      <BottomBox>
        <input placeholder="채팅을 입력하세요."></input>
        <button>보내기</button>
      </BottomBox>
    </Wrap>
  );
};

export default InGameChatBox;
