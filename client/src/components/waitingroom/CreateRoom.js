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
const Cancel = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  color: white;
  font-size: 25px;
`;

const CreateRoom = ({ isOpen }) => {
  return (
    <Container>
      <Box>
        <div>
          <span>방 만들기</span>
        </div>
        <div>
          <input placeholder="방제목을 입력하세요."></input>
          <button>방만들기</button>
        </div>
        <Cancel onClick={() => isOpen(false)}>X</Cancel>
      </Box>
    </Container>
  );
};

export default CreateRoom;
