import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  fetching: false,
  deletePost: () => {},
});
const reducer = (postList, action) => {
  let newPostList = postList;
  if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...postList];
  } else if (action.type === "DEL_POST") {
    newPostList = postList.filter((item) => item.id !== action.payload.id);
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(reducer, []);
  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: { posts },
    });
  };
  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DEL_POST",
        payload: {
          id: postId,
        },
      });
    },
    [dispatchPostList]
  );
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
    <PostListContext.Provider
      value={{
        postList: postList,
        addPost: addPost,
        fetching: fetching,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
