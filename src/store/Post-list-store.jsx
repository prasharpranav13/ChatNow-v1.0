import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const reducer = (postList, action) => {
  let newPostList = postList;
  if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...postList];
  } else if (action.type === "DEL_POST") {
    newPostList = postList.filter((item) => item.id !== action.payload.id);
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(reducer, DEFAULT_POST_LIST);
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
      value={{ postList: postList, addPost: addPost, deletePost: deletePost }}
    >
      {children}
    </PostListContext.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to mumbai",
    body: "hi all going to mumbai for vacations",
    reactions: 0,
    userId: "user-9",
    tags: ["vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Passed Btech",
    body: "Finally pass ho gye bhai itne mastiyon k bad v",
    reactions: 15,
    userId: "user-12",
    tags: ["Graduating", "Unbelievable", "Enjoying"],
  },
  {
    id: "3",
    title: "Got a job!",
    body: "Glad to announce that i secured a full time offer at XYZ as a software developer.I would like to thank all my friend and snrs and everyone who helped and supported me during this journey ",
    reactions: 35,
    userId: "user-23",
    tags: ["Job", "XYZ", "SDE"],
  },
];
export default PostListProvider;
