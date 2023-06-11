import { useState } from "react";
import { useSearchParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
import FrontDesk from "../Components/FrontDesk";
import Paragraph from "../Components/Paragraph";
import InfoPanel from "../Components/InfoPanel";
import { StoryInfo } from "../System/StoryInfo";
import { Story } from "../System/Story";
import { Chapter } from "../System/Chapter";
import * as Load from "../Utility/Load";
import * as Select from "../Utility/Select";
import { version } from "../version";
import * as React from "react";
import { jump } from "../Utility/Jump";

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
    //SearchTerm
    let searchTerm: string | undefined;
    let setSearchTerm: (searchTerm: string | undefined) => void;
    const defaultSearchTerm: () => string | undefined = () => undefined;
    [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

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
        ? (story as Story).title + " (Story Viewer)"
        : "Story Viewer";

    //2023-05-30: copied from https://stackoverflow.com/a/56394177/2336212
    const jumped = React.useRef(false);
    React.useEffect(() => {
        if (jumped.current) {
            return;
        }

        //Post-load scroll
        let hash = window.location.hash;
        if (hash) {
            let nodeId = hash.substring(1);
            if (nodeId && document.getElementById(nodeId)) {
                jump(nodeId);
                jumped.current = true;
            }
        }
    }, [story, storyInfo]);

    return (
        <>
            <InfoPanel
                searchTerm={searchTerm}
                story={story}
                storyInfo={storyInfo}
                setSearchTerm={setSearchTerm}
            />
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
                    {index == 0 ? "Title" : `Ch${index}`}
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
            <div id="divParagraphs">
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
                                                let id =
                                                    "p" + chIndex + "-" + index;
                                                Select.selectText(id);
                                                history.pushState(
                                                    undefined,
                                                    storyInfo?.title,
                                                    `#${id}`
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
                                        setSearchTerm={setSearchTerm}
                                        id={"p" + chIndex + "-" + index}
                                    />
                                    <p></p>
                                </>
                            )}
                        </>
                    ))
                )}
            </div>
            {story && (
                <p
                    id="chEnd"
                    className="end"
                >
                    ~ ~ ~
                </p>
            )}
            {story && storyInfo?.lastupdated && (
                <div className="lastupdated">
                    Last Updated: {storyInfo.lastupdated}
                </div>
            )}
            {story && storyInfo?.author && (
                <div className="copyright">
                    {storyInfo.title ?? story?.title ?? "Story"} &#169;{" "}
                    {storyInfo.year ?? new Date().getFullYear()}{" "}
                    {storyInfo.author}
                </div>
            )}
            <div className="copyright">
                Story Viewer {version} &#169; 2023 shieldgenerator7
            </div>
        </>
    );
}

export default Home;
