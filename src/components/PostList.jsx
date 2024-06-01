import { useContext, useEffect, useRef, useState } from "react";
import { PostListContext } from "../store/Post-list-store";
import Post from "./Post";
import WelcomeMsg from "./WelcomeMsg";
const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListContext);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((obj) => {
        addInitialPosts(obj.posts);
      });
  }, []);

  return (
    <>
      {postList.length === 0 && <WelcomeMsg />}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
export default PostList;
