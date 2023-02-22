import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import FormData from "../pages/login";

const useAuth = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        data
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const login = async (data) => {
  //   try {
  //     await axios.post("http://localhost:8000/users/signin", data,
  //     { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  //     // {
  //     //   grant_type: '',
  //     //   username: emailRef,
  //     //   password: passwordRef,
  //     //   scope: '',
  //     //   client_id: '',
  //     //   client_secret: '',
  //     // }
  //     );
  //     await getUser();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getUser = async () => {
    try {
      const response = await axios.get("/users/me");
      const user = response.data.user;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return { user, signup };
};

export default useAuth;
