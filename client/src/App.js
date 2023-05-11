import "./App.css";
// import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PlayGame from "./pages/PlayGame";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="playgame" element={<PlayGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
