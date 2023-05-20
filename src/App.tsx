import { useState } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import FrontDesk from "./Components/FrontDesk";
import Paragraph from "./Components/Paragraph";

function App() {
    const [story, setStory] = useState(undefined);
    const [characters, setCharacters] = useState(undefined);

    let searchWords = characters?.chapters ?? [];
    return (
        <>
            {!story && (
                <FrontDesk
                    label="Story"
                    setStory={setStory}
                />
            )}
            {!characters && (
                <FrontDesk
                    label="Characters"
                    setStory={setCharacters}
                />
            )}
            {story?.chapters.map((chapter, chIndex) =>
                chapter.lines.map((line, index) => (
                    <>
                        {index == 0 && (
                            <h1 key={chIndex * 100000 + index}>{line}</h1>
                        )}
                        {index > 0 && (
                            <>
                                {line?.trim().length > 0 && (
                                    <span className="place">
                                        {chIndex}-{index}
                                    </span>
                                )}
                                <Paragraph
                                    paragraph={line}
                                    searchWords={searchWords}
                                />
                                <p></p>
                            </>
                        )}
                    </>
                ))
            )}
        </>
    );
}

export default App;
