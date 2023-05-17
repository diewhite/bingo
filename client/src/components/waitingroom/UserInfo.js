import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  font-family: "Open Sans";
  color: white;
  font-size: 25px;
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2);
  font-weight: 500;
  padding-left: 20px;
`;

const UserInfo = ({ isName }) => {
  return <Container>{isName}님 bingo 게임에 오신 것을 환영 합니다.</Container>;
};

export default UserInfo;
