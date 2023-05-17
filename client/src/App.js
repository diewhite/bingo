import "./App.css";
// import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PlayGame from "./pages/PlayGame";
import { useState } from "react";

function App() {
  const [isName, setIsName] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Landing setIsName={setIsName} isName={isName} />}
          />
          <Route
            path="playgame"
            element={<PlayGame setIsName={setIsName} isName={isName} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
