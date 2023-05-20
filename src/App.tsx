import { useState } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import Message from "./Components/Message";
import FrontDesk from "./Components/FrontDesk";

function App() {
    const [count, setCount] = useState(0);
    const [story, setStory] = useState(undefined);

    return (
        <>
            <Message />
            {!story && <FrontDesk setStory={setStory} />}
            {story?.url}
        </>
    );
}

export default App;
