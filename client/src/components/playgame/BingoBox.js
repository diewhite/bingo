import React from "react";
import { styled } from "styled-components";
import BingoNumberBox from "./BingoNumberBox";
import InGameChatBox from "./InGameChatBox";

const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
`;
const BingoBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  /* height: 800px; */
  gap: 5px;
  flex-wrap: wrap;
`;
const BingoBox = ({ newMessage, isGameChat, isJoinedInfo, leaveRoom }) => {
  return (
    <Wrap>
      <BingoBoard>
        <BingoNumberBox>1</BingoNumberBox>
        <BingoNumberBox>2</BingoNumberBox>
        <BingoNumberBox>3</BingoNumberBox>
        <BingoNumberBox>4</BingoNumberBox>
        <BingoNumberBox>5</BingoNumberBox>
        <BingoNumberBox>6</BingoNumberBox>
        <BingoNumberBox>7</BingoNumberBox>
        <BingoNumberBox>8</BingoNumberBox>
        <BingoNumberBox>9</BingoNumberBox>
        <BingoNumberBox>10</BingoNumberBox>
        <BingoNumberBox>11</BingoNumberBox>
        <BingoNumberBox>12</BingoNumberBox>
        <BingoNumberBox>13</BingoNumberBox>
        <BingoNumberBox>14</BingoNumberBox>
        <BingoNumberBox>15</BingoNumberBox>
        <BingoNumberBox>16</BingoNumberBox>
        <BingoNumberBox>17</BingoNumberBox>
        <BingoNumberBox>18</BingoNumberBox>
        <BingoNumberBox>19</BingoNumberBox>
        <BingoNumberBox>20</BingoNumberBox>
        <BingoNumberBox>21</BingoNumberBox>
        <BingoNumberBox>22</BingoNumberBox>
        <BingoNumberBox>23</BingoNumberBox>
        <BingoNumberBox>24</BingoNumberBox>
        <BingoNumberBox>25</BingoNumberBox>
      </BingoBoard>
      <InGameChatBox
        leaveRoom={leaveRoom}
        newMessage={newMessage}
        isGameChat={isGameChat}
        isJoinedInfo={isJoinedInfo}
      ></InGameChatBox>
    </Wrap>
  );
};

export default BingoBox;
