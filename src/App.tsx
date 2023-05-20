import { useState } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import FrontDesk from "./Components/FrontDesk";

function App() {
    const [story, setStory] = useState(undefined);

    return (
        <>
            {!story && <FrontDesk setStory={setStory} />}
            {story?.text.indexOf("\n")}
            {story?.lines.map((line) => (
                <div>{line}</div>
            ))}
        </>
    );
}

export default App;
