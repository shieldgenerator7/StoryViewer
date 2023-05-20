import { useState } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import FrontDesk from "./Components/FrontDesk";
import Paragraph from "./Components/Paragraph";

function App() {
    const [story, setStory] = useState(undefined);
    const [characters, setCharacters] = useState(undefined);

    let searchWords = characters?.chapters ?? [];

    //2023-05-19: copied from https://stackoverflow.com/a/987376/2336212
    function selectText(nodeId: string) {
        const node = document.getElementById(nodeId);

        if (document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(node);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            console.warn("Could not select text in node: Unsupported browser.");
        }
    }

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
                            <h1
                                id={"ch" + chIndex}
                                key={chIndex + "-" + index}
                            >
                                {line}
                            </h1>
                        )}
                        {index > 0 && (
                            <>
                                {line?.trim().length > 0 && (
                                    <span
                                        className="place"
                                        key={"spn" + chIndex + "-" + index}
                                        onClick={() => {
                                            selectText(
                                                "p" + chIndex + "-" + index
                                            );
                                        }}
                                    >
                                        {chIndex}-{index}
                                    </span>
                                )}
                                <Paragraph
                                    key={"p" + chIndex + "-" + index}
                                    paragraph={line}
                                    searchWords={searchWords}
                                    id={"p" + chIndex + "-" + index}
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
