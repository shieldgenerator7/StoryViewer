import { useState } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import Message from "./Components/Message";
import FrontDesk from "./Components/FrontDesk";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Message />
      <FrontDesk />
    </>
  );
}

export default App;
