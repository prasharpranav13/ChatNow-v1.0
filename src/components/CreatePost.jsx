import { useContext, useRef } from "react";
import { PostListContext } from "../store/Post-list-store";
const CreatePost = () => {
  const { addPost } = useContext(PostListContext);
  const userIdElement = useRef();
  const titleElement = useRef();
  const contentElement = useRef();
  const tagsElement = useRef();
  const reactionElement = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const title = titleElement.current.value;
    const content = contentElement.current.value;
    const reactions = reactionElement.current.value;
    const tags = tagsElement.current.value;
    const validTags = tags.split(" ");
    userIdElement.current.value = "";
    titleElement.current.value = "";
    contentElement.current.value = "";
    reactionElement.current.value = "";
    tagsElement.current.value = "";
    addPost(userId, title, content, validTags, reactions);
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User Id
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            placeholder="Enter your user Id here.."
            ref={userIdElement}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="How are you feeling today?"
            ref={titleElement}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Post content
          </label>
          <textarea
            type="text"
            id="content"
            className="form-control"
            rows="4"
            placeholder="Tell us more about it.."
            ref={contentElement}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Enter your hashtags here
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            placeholder="Tags separated by space"
            ref={tagsElement}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            Reactions
          </label>
          <input
            type="text"
            className="form-control"
            id="reactions"
            placeholder="How many people reacted to your post?"
            ref={reactionElement}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="Check1" />
          <label className="form-check-label" htmlFor="Check1">
            Are you ready to post?
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
};
export default CreatePost;
