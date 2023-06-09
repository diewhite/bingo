import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: calc(50% - 26px);
  height: 100px;
  display: flex;
  /* margin-top: 0; */
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
    /* background-color: #d9d9d9; */
    height: 77px;
  }
  div:nth-child(1) {
    display: flex;

    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 20px;
    font-weight: 500;
    border-radius: 77px;
    border: solid 1px black;
  }
  div:nth-child(2) {
    display: flex;
    border-radius: 10px;
    padding-left: 10px;
    align-items: center;
    width: calc(100% - 137px - 20px);
    height: 77px;
    font-weight: 700;
    font-size: 20px;
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

const RoomBox = ({ el, index, joinRoom }) => {
  return (
    <Container onClick={() => joinRoom(el)}>
      <div>{index + 1}</div>
      <div>{el.title}</div>
      <div>
        {el.player1?.length > 0 && el.player2?.length > 0 ? "2/2" : "1/2"}
      </div>
    </Container>
  );
};

export default RoomBox;
