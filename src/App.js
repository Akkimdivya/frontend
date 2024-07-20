import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Search from "./components/Search";
import Lists from "./components/Lists";
import EditList from "./components/EditList";
import Home from "./components/Home";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<Search />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/edit-list/:id" element={<EditList />} />
    </Routes>
  );
}

export default App;
