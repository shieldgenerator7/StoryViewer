"use strict";

interface Props {
    setStory: Function;
}

function FrontDesk({ setStory }: Props) {
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
