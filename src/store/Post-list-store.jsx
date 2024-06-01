import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
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
  const addPost = (userId, title, content, validTags, reactions) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        //generate random unique id
        id: userId + Math.floor(Math.random()),
        title: title,
        body: content,
        reactions: reactions,
        userId: userId,
        tags: validTags,
      },
    });
  };
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: { posts },
    });
  };
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DEL_POST",
      payload: {
        id: postId,
      },
    });
  };
  return (
    <PostListContext.Provider
      value={{
        postList: postList,
        addPost: addPost,
        addInitialPosts: addInitialPosts,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
