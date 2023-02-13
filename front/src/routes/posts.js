import { useLoaderData } from "react-router-dom";
export async function loader() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();
  return { posts };
}

function Posts() {
  const { posts } = useLoaderData();
  return (
    <>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.id}:{post.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Posts;
