import { useState } from "react";
import { useSearchParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
import FrontDesk from "../Components/FrontDesk";
import ParagraphC from "../Components/ParagraphC";
import InfoPanel from "../Components/InfoPanel";
import { StoryInfo } from "../System/StoryInfo";
import { Story } from "../System/Story";
import { Chapter } from "../System/Chapter";
import { Paragraph } from "../System/Paragraph";
import { Storage } from "../System/Storage";
import * as Load from "../Utility/Load";
import * as Select from "../Utility/Select";
import { version } from "../version";
import * as React from "react";
import { jump } from "../Utility/Jump";

//2023-07-25: copied from https://stackoverflow.com/a/47736563/2336212
// must cast as any to set property on window
const _global = window as any;
let storage;

function Home() {
    //Storage
    storage ??= new Storage();
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
    _global.setSearchTerm = setSearchTerm;

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
        storage.storeURL(searchURL ?? dndURL, storyInfo, dndURL ? "dnd" : "");
    }
    else if (story) {        
        storage.storeURL(searchURL ?? dndURL, story, dndURL ? "dnd" : "");
    }

    //let searchWords = characters ?? [];

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
                        storage={storage}
                        setSearchParams={setSearchParams}
                    />
                </div>
            )}
            {/* Chapter Link */}
            <span className="buttonLinkContainer hideableContainer"></span>
            <span className="buttonLinkContainer hideable">
                {story?.chapters.map((chapter: Chapter) => (
                    <a
                        className="buttonLink"
                        href={"#" + "ch" + chapter.number}
                        title={chapter.title}
                    >
                        {chapter.getLabelShort()}
                    </a>
                ))}
                {story && (
                    <a
                        className="buttonLink"
                        href={"#" + "chEnd"}
                        title="End"
                    >
                        End
                    </a>
                )}
            </span>
            <div id="divParagraphs">
                {story?.chapters.map((chapter: Chapter) =>
                    chapter.paragraphs.map(
                        (paragraph: Paragraph, index: number) => (
                            <>
                                {/* Paragraph Header */}
                                {index == 0 && (
                                    <h1
                                        id={"ch" + chapter.number}
                                        key={chapter.number + "-" + index}
                                    >
                                        {paragraph.text}
                                    </h1>
                                )}
                                {index > 0 && (
                                    <>
                                        {/* Paragraph Links */}
                                        {paragraph?.text.trim().length > 0 && (
                                            <span
                                                className="place"
                                                key={
                                                    "spn" +
                                                    chapter.number +
                                                    "-" +
                                                    index
                                                }
                                                onClick={() => {
                                                    let id =
                                                        "p" +
                                                        chapter.number +
                                                        "-" +
                                                        index;
                                                    Select.selectText(id);
                                                    history.pushState(
                                                        undefined,
                                                        storyInfo?.title,
                                                        `#${id}`
                                                    );
                                                }}
                                            >
                                                {chapter.number}-{index}
                                            </span>
                                        )}
                                        {/* Paragraph Content */}
                                        <ParagraphC
                                            key={
                                                "p" +
                                                chapter.number +
                                                "-" +
                                                index
                                            }
                                            paragraph={paragraph}
                                            id={
                                                "p" +
                                                chapter.number +
                                                "-" +
                                                index
                                            }
                                            activeCharName={searchTerm}
                                        />
                                        <p></p>
                                    </>
                                )}
                            </>
                        )
                    )
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
