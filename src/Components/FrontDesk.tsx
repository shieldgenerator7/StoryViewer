"use strict";
import { Story } from "./System/Story";

interface Props {
    label: string;
    setStory: (story: Story) => void;
}

function FrontDesk({ label, setStory }: Props) {
    let loadText = function (url: string) {
        if (url) {
            //2023-05-19: copied from https://stackoverflow.com/a/39758157/2336212
            fetch(url).then(function (response) {
                response.text().then(function (text) {
                    setStory(new Story(text));
                });
            });
        }
    };

    return (
        <>
            Enter URL of {label}:
            <input
                id={`txtURL${label}`}
                className="url"
                placeholder="https://raw.githubusercontent.com/user/repository/file"
            ></input>
            <button
                id="btnLoad"
                onClick={() =>
                    loadText((document.getElementById(`txtURL${label}`) as HTMLInputElement)?.value)
                }
            >
                GO
            </button>
        </>
    );
}

export default FrontDesk;
