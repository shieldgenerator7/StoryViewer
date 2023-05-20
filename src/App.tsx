import { useState } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import FrontDesk from "./Components/FrontDesk";
import Paragraph from "./Components/Paragraph";

function App() {
    const [story, setStory] = useState(undefined);
    const searchWords = [
        "dwarf",
        "Astalir",
        "deer",
        "Jodi",
        "Sui",
        "Grar",
        "kobold",
    ];
    return (
        <>
            {!story && <FrontDesk setStory={setStory} />}
            {story?.chapters.map((chapter, chIndex) =>
                chapter.lines.map((line, index) => (
                    <>
                        {index == 0 && (
                            <h1 key={chIndex * 100000 + index}>{line}</h1>
                        )}
                        {index > 0 && (
                            <Paragraph
                                paragraph={line}
                                searchWords={searchWords}
                            />
                        )}
                    </>
                ))
            )}
        </>
    );
}

export default App;
