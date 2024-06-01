import { useContext, useEffect, useRef, useState } from "react";
import { PostListContext } from "../store/Post-list-store";
import Post from "./Post";
import WelcomeMsg from "./WelcomeMsg";
import LoadingSpinner from "./LoadingSpinner";
const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListContext);

  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setFetching(true); //fetching data
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((obj) => {
        addInitialPosts(obj.posts);
        setFetching(false); //data fetched
      });
    return () => {
      console.log("Cleaning up useEffect..");
      controller.abort();
    };
  }, []);

  return (
    <>
      {fetching === true && <LoadingSpinner />}

      {fetching === false && postList.length === 0 && <WelcomeMsg />}
      {fetching === false &&
        postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};
export default PostList;
