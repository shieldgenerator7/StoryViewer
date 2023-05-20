"use strict";

interface Props {
    setStory: Function;
}

function FrontDesk({ setStory }: Props) {
    let loadText = function (url: string) {
        if (url) {
            alert(url);
            setStory(url);
        }
    };

    return (
        <>
            Enter URL of story:
            <input
                id="txtURL"
                className="url"
                placeholder="https://raw.githubusercontent.com/user/repository/file"
            ></input>
            <button
                id="btnLoad"
                onClick={() =>
                    loadText(document.getElementById("txtURL")?.value)
                }
            >
                GO
            </button>
        </>
    );
}

export default FrontDesk;
