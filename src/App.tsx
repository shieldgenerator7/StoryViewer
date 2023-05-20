import { useState } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import FrontDesk from "./Components/FrontDesk";
import Paragraph from "./Components/Paragraph";

function App() {
    const [story, setStory] = useState(undefined);

    return (
        <>
            {!story && <FrontDesk setStory={setStory} />}
            {story?.chapters.map((chapter, chIndex) =>
                chapter.lines.map((line, index) => (
                    <>
                        {index == 0 && (
                            <h1 key={chIndex * 100000 + index}>{line}</h1>
                        )}
                        {index > 0 && <Paragraph paragraph={line} />}
                    </>
                ))
            )}
        </>
    );
}

export default App;
