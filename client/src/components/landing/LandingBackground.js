import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import CreateNameModal from "./CreateNameModal";

const Container = styled.div`
  position: absolute;
  width: 100%;
  min-width: 800px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 101;
  font-family: "Open Sans";
`;

const Background = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: url(https://cdn.discordapp.com/attachments/900742245920166020/902378783846330439/Group_89.png);
  background-position: 0px 800px;
  background-repeat: repeat-x;
  animation: filling 10s ease-in-out infinite;
  @keyframes filling {
    30% {
      background-position: 6000px -330px;
    }
    100% {
      background-position: 7000px 800px;
    }
  }
`;

const Title = styled.div`
  font-size: 128px;
  font-weight: 700;
  color: white;
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
    0px -3px 20px rgba(255, 255, 255, 0.4);
  /* font-weight: 300; */
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100px;
  border-radius: 15px;
  font-size: 40px;
  cursor: pointer;
  color: white;
  text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2);
  a:hover {
    color: yellow;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 110;
  gap: 50px;
`;

const LandingBackground = () => {
  const [isStart, setIsStart] = useState(false);
  const navigate = useNavigate();
  const handleClickToGame = () => {
    navigate("/playgame");
    setIsStart(false);
  };
  console.log(isStart);
  return (
    <>
      <Container>
        <Background></Background>
        <TitleBox>
          <Title>B I N G O</Title>
          <Button onClick={() => setIsStart(true)}>S T A R T!</Button>
        </TitleBox>
        {isStart ? (
          <CreateNameModal
            handleClickToGame={handleClickToGame}
            setIsOpen={setIsStart}
          ></CreateNameModal>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default LandingBackground;
