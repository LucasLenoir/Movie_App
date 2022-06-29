import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/Category";
import Home from "./pages/Home";
import UserList from "./pages/UserList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/fav" element={<UserList />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
