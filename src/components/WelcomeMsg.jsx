const WelcomeMsg = ({ OnGetPostClick }) => {
  return (
    <>
      <center>
        <h1 className="wlcm">There are no posts</h1>
        <button className="btn btn-primary mt-3" onClick={OnGetPostClick}>
          Get Posts From Server
        </button>
      </center>
    </>
  );
};
export default WelcomeMsg;
