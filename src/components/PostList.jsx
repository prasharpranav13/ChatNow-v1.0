import { useContext } from "react";
import { PostListContext } from "../store/Post-list-store";
import Post from "./Post";

const PostList = () => {
  const { postList } = useContext(PostListContext);
  return (
    <>
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
export default PostList;
