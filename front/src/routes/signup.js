import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Signup</h2>
      <button onClick={() => navigate("/contact")}>Contact</button>
    </>
  );
}

export default Signup;
