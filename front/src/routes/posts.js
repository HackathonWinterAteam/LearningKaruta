export async function loader() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();
  return { posts };
}

function Posts() {
  return (
    <>
      <h2>Posts</h2>
    </>
  );
}

export default Posts;
