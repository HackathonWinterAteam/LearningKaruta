import axios from "axios";

// FastAPIのURLを指定する
axios.default.baseURL = "http://localhost:8000/docs";

export default axios;
