import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: calc(50% - 30px);
  height: 100px;
  display: flex;
  border-radius: 15px;
  align-items: center;
  background: #a3daff;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  justify-content: space-between;
  /* gap: 5px; */
  padding-right: 10px;
  padding-left: 10px;
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 15px;
  div {
    background-color: #d9d9d9;
    height: 77px;
  }
  div:nth-child(1) {
    display: flex;

    justify-content: center;
    align-items: center;
    width: 77px;
    height: 77px;
    font-size: 20px;
    font-weight: 500;
    border-radius: 77px;
  }
  div:nth-child(2) {
    display: flex;
    border-radius: 10px;
    padding-left: 10px;
    align-items: center;
    width: 200px;
    height: 77px;
    font-weight: 700;
    font-size: 20px;
    background: #d9d9d9;
  }
  div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 30px;
    width: 60px;
  }
`;

const RoomBox = () => {
  return (
    <Container>
      <div>1</div>
      <div>빙고 같이 할 사람 드루와</div>
      <div>1/2</div>
    </Container>
  );
};

export default RoomBox;
