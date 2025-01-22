import { useState } from "react";
import "./App.css";
import LoginScreen from "./Screens/LoginScreen";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainScreen from "./Screens/MainScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
