import Home from "./routes/home";
import About from "./routes/about";
import Contact from "./routes/contact";

function Main() {
  return (
    <div>
      <h1>Hello React Router v6</h1>
      <Home />
      <About />
      <Contact />
    </div>
  );
}

export default Main;
