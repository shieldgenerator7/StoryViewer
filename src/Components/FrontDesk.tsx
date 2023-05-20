"use strict";

function FrontDesk() {
    let loadText = function (url: string) {
        if (url) {
            alert(url);
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
