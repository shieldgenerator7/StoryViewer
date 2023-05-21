"use strict";
import { Story } from "../System/Story";
import { StoryInfo } from "../System/StoryInfo";
import * as Load from "../Utility/Load";

interface Props {
    label: string;
    setStory: (story: Story) => void;
    setStoryInfo: (storyInfo: StoryInfo) => void;
}

function FrontDesk({ label, setStory, setStoryInfo }: Props) {
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
                    Load.loadFile(
                        (document.getElementById(txtURLId) as HTMLInputElement)
                            ?.value,
                        setStory,
                        setStoryInfo
                    )
                }
            >
                GO
            </button>
        </>
    );
}

export default FrontDesk;
