import { MdOutlineDelete } from "react-icons/md";
import { PostListContext } from "../store/Post-list-store";
import { useContext } from "react";
const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);
  return (
    <div className="card postCard" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger delete"
            onClick={() => {
              deletePost(post.id);
            }}
          >
            <MdOutlineDelete />
            <span class="visually-hidden">unread messages</span>
          </span>
        </h5>
        <p className="card-text">{post.body}</p>

        {post.tags.map((item) => (
          <span key={item.id} class="badge text-bg-primary tags">
            #{item}
          </span>
        ))}

        <div class="alert alert-success reaction" role="alert">
          {post.reactions.likes} people liked your post.
        </div>
      </div>
    </div>
  );
};
export default Post;
