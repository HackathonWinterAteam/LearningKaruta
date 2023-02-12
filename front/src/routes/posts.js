import { Outlet } from "react-router-dom";

function Posts() {
  return (
    <>
      <h2>Posts</h2>
      <Outlet />
    </>
  );
}

export default Posts;
