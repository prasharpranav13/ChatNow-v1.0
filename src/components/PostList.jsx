import { useContext } from "react";
import { PostListContext } from "../store/Post-list-store";
import Post from "./Post";
import WelcomeMsg from "./WelcomeMsg";
import LoadingSpinner from "./LoadingSpinner";
const PostList = () => {
  const { postList, fetching } = useContext(PostListContext);

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
