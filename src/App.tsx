import { useState } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import FrontDesk from "./Components/FrontDesk";
import Paragraph from "./Components/Paragraph";
import { Story } from "./System/Story";
import { Chapter } from "./System/Chapter";

function App() {
    let story: Story;
    let setStory;
    [story, setStory] = useState(undefined);
    let characters: Story;
    let setCharacters;
    [characters, setCharacters] = useState(undefined);

    let searchWords = characters?.chapters ?? [];

    //2023-05-19: copied from https://stackoverflow.com/a/987376/2336212
    // function selectText(nodeId: string) {
    // const node = document.getElementById(nodeId);
    // if (document.body.createTextRange) {
    //     const range = document.body.createTextRange();
    //     range.moveToElementText(node);
    //     range.select();
    // } else if (window.getSelection) {
    //     const selection = window.getSelection();
    //     const range = document.createRange();
    //     range.selectNodeContents(node);
    //     selection.removeAllRanges();
    //     selection.addRange(range);
    // } else {
    //     console.warn("Could not select text in node: Unsupported browser.");
    // }
    // }

    document.title = story
        ? story.chapters[0].title + " (Story Viewer)"
        : "Story Viewer";

    return (
        <>
            {!story && (
                <div>
                    <FrontDesk
                        label="Story"
                        setStory={setStory}
                    />
                </div>
            )}
            {!characters && (
                <div>
                    <FrontDesk
                        label="Characters"
                        setStory={setCharacters}
                    />
                </div>
            )}
            {story?.chapters.map((chapter: Chapter, index: number) => (
                <a
                    className="buttonLink"
                    href={"#" + "ch" + index}
                    style={{ left: index * 35 + 10 }}
                    title={chapter.title}
                >
                    Ch{index}
                </a>
            ))}
            {story && (
                <a
                    className="buttonLink"
                    href={"#" + "chEnd"}
                    style={{ left: story.chapters.length * 35 + 10 }}
                >
                    End
                </a>
            )}
            {story?.chapters.map((chapter: Chapter, chIndex: number) =>
                chapter.lines.map((line: string, index: number) => (
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
                                            // selectText(
                                            //     "p" + chIndex + "-" + index
                                            // );
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
            {story && (
                <p
                    id="chEnd"
                    className="end"
                >
                    ~ ~ ~
                </p>
            )}
        </>
    );
}

export default App;
