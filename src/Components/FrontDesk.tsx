"use strict";
import { Story } from "../System/Story";
import { StoryInfo } from "../System/StoryInfo";
import * as Fetch from "../Utility/Fetch";

interface Props {
    label: string;
    setStory: (story: Story) => void;
    setStoryInfo?: (storyInfo: StoryInfo) => void;
}

function FrontDesk({ label, setStory, setStoryInfo }: Props) {
    let loadText = function (url: string) {
        if (url) {
            Fetch.fetchFile(url, (text: string) => {
                if (url.endsWith(".md")) {
                    processMD(text);
                } else if (url.endsWith(".json")) {
                    processJSON(text, url);
                }
            });
        }
    };

    let processMD = function (text: string) {
        setStory(new Story(text));
    };

    let processJSON = function (text: string, url: string) {
        if (!setStoryInfo) {
            return;
        }
        let storyInfo = new StoryInfo();
        let urls = JSON.parse(text);
        let baseURL = url.substring(0, url.lastIndexOf("/")) + "/";
        Fetch.fetchFile(baseURL + urls.story, (txt: string) => {
            storyInfo.story = new Story(txt);
            setStoryInfo?.(storyInfo);
        });
        Fetch.fetchFile(baseURL + urls.characters, (txt: string) => {
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
