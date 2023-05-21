import { useState } from "react";
import { useSearchParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
import FrontDesk from "../Components/FrontDesk";
import Paragraph from "../Components/Paragraph";
import { StoryInfo } from "../System/StoryInfo";
import { Story } from "../System/Story";
import { Chapter } from "../System/Chapter";
import * as Load from "../Utility/Load";
import * as Select from "../Utility/Select";

function Home() {
    //StoryInfo
    let storyInfo: StoryInfo | undefined;
    let setStoryInfo;
    const defaultStoryInfo: () => StoryInfo | undefined = () => undefined;
    [storyInfo, setStoryInfo] = useState(defaultStoryInfo);
    //Story
    let story: Story | undefined;
    let setStory: (story: Story | undefined) => void;
    const defaultStory: () => Story | undefined = () => undefined;
    [story, setStory] = useState(defaultStory);
    //Characters
    let characters: [] | undefined;
    let setCharacters: (story: [] | undefined) => void;
    const defaultCharacters: () => [] | undefined = () => undefined;
    [characters, setCharacters] = useState(defaultCharacters);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchURL = searchParams.get("url");
    const dndURL = searchParams.get("dnd");
    const anyURL = searchURL || dndURL;
    if (searchURL) {
        if (!storyInfo && !story && !characters) {
            Load.loadFile(searchURL, setStory, setStoryInfo);
        }
    } else if (dndURL) {
        if (!storyInfo && !story && !characters) {
            Load.loadFile(
                `https://raw.githubusercontent.com/shieldgenerator7/DnD-Stories/main/${dndURL}/${dndURL}.json`,
                setStory,
                setStoryInfo
            );
        }
    } else {
        if (storyInfo) {
            setStoryInfo(undefined);
        }
        if (story) {
            setStory(undefined);
        }
        if (characters) {
            setCharacters(undefined);
        }
    }
    let searchURLSplit = searchURL?.split("/") ?? [];

    if (storyInfo) {
        if (story != storyInfo.story) {
            setStory(storyInfo.story);
        }
        if (characters != storyInfo.characters) {
            setCharacters(storyInfo.characters);
        }
    }

    let searchWords = characters ?? [];

    document.title = story
        ? (story as Story).chapters[0].title + " (Story Viewer)"
        : "Story Viewer";

    return (
        <>
            {searchURL && !story && (
                <div>
                    Loading {searchURLSplit[searchURLSplit.length - 1]}...
                </div>
            )}
            {dndURL && !story && <div>Loading {dndURL}...</div>}
            {!anyURL && !story && (
                <div>
                    <FrontDesk
                        label="Story"
                        setSearchParams={setSearchParams}
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
                                            Select.selectText(
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

export default Home;
