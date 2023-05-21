"use strict";
import { Story } from "../System/Story";
import { StoryInfo } from "../System/StoryInfo";

interface Props {
    label: string;
    setStory: (story: Story) => void;
    setStoryInfo?: (storyInfo: StoryInfo) => void;
}

function FrontDesk({ label, setStory, setStoryInfo }: Props) {
    let loadText = function (url: string) {
        if (url) {
            //2023-05-19: copied from https://stackoverflow.com/a/39758157/2336212
            fetch(url).then(function (response) {
                response.text().then(function (text) {
                    if (url.endsWith(".md")) {
                        processMD(text);
                    } else if (url.endsWith(".json")) {
                        processJSON(text, url);
                    }
                });
            });
        }
    };

    let fetchFile = function (url: string, callBack: (text: string) => void) {
        fetch(url).then(function (response) {
            response.text().then(function (text) {
                callBack(text);
            });
        });
    };

    let processMD = function (text: string) {
        setStory(new Story(text));
    };

    let processJSON = function (text: string, url: string) {
        let storyInfo = new StoryInfo();
        let urls = JSON.parse(text);
        let baseURL = url.substring(0, url.lastIndexOf("/")) + "/";
        fetchFile(baseURL + urls.story, (txt) => {
            storyInfo.story = new Story(txt);
            setStoryInfo?.(storyInfo);
        });
        fetchFile(baseURL + urls.characters, (txt) => {
            storyInfo.characters = new Story(txt);
            setStoryInfo?.(storyInfo);
        });
        setStoryInfo?.(storyInfo);
    };

    return (
        <>
            Enter URL of {label}:
            <input
                id={`txtURL${label}`}
                className="url"
                placeholder={`https://raw.githubusercontent.com/user/repository/${label}.md`}
            ></input>
            <button
                id="btnLoad"
                onClick={() =>
                    loadText(
                        (
                            document.getElementById(
                                `txtURL${label}`
                            ) as HTMLInputElement
                        )?.value
                    )
                }
            >
                GO
            </button>
        </>
    );
}

export default FrontDesk;
