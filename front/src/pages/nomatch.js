import { NavLink } from "react-router-dom";

function NoMatch() {
  return (
    <>
      <h2>このページは存在しません。</h2>

      <li>
        <NavLink
          style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
          to="/"
        >
          Home
        </NavLink>
      </li>
    </>
  );
}

export default NoMatch;
