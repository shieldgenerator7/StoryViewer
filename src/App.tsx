import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Message from "./Components/Message";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Message />
    </>
  );
}

export default App;
