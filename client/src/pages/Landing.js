import React from "react";
import LandingBackground from "../components/landing/LandingBackground";

const Landing = ({ setIsName, isName }) => {
  return (
    <>
      <LandingBackground
        setIsName={setIsName}
        isName={isName}
      ></LandingBackground>
    </>
  );
};

export default Landing;
