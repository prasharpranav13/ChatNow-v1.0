import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PostListProvider from "./store/Post-list-store";
function App() {
  return (
    <PostListProvider>
      <div className="bodyContainer">
        <Sidebar />
        <div className="content">
          <Header></Header>
          <Outlet />
          {/* <Footer></Footer> */}
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
