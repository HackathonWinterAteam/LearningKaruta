import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      const response = await axios.post("/users/register", data);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data) => {
    try {
      await axios.post("/users/signin", data);
      await getUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/users/me");
      const user = response.data.user;
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return { user, signup, login };
};

export default useAuth;
