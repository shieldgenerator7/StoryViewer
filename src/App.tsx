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
            {story?.chapters.map((chapter) =>
                chapter.lines.map((line, index) => (
                    <>
                        {index == 0 && <h1 key={index}>{line}</h1>}
                        {index > 0 && <p key={index}>{line}</p>}
                    </>
                ))
            )}
        </>
    );
}

export default App;
