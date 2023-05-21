"use strict";
import { Story } from "../System/Story";
import { StoryInfo } from "../System/StoryInfo";

interface Props {
    label: string;
    setStory: (story: Story) => void;
    setStoryInfo: (storyInfo: StoryInfo) => void;
    setSearchParams: (searchParams: URLSearchParams) => void;
}

function FrontDesk({ label, setStory, setStoryInfo, setSearchParams }: Props) {
    const txtURLId = `txtURL${label}`;

    return (
        <>
            Enter URL of {label}:
            <input
                id={txtURLId}
                className="url"
                placeholder={`https://raw.githubusercontent.com/user/repository/${label}.md`}
            ></input>
            <button
                id="btnLoad"
                onClick={() =>
                    setSearchParams(
                        new URLSearchParams(
                            "url=" +
                                (
                                    document.getElementById(
                                        txtURLId
                                    ) as HTMLInputElement
                                )?.value
                        )
                    )
                }
            >
                GO
            </button>
        </>
    );
}

export default FrontDesk;
