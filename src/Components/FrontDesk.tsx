"use strict";

import { Storage } from "../System/Storage";

interface Props {
    label: string;
    storage: Storage;
    setSearchParams: (searchParams: URLSearchParams) => void;
}

function FrontDesk({ label, storage, setSearchParams }: Props) {
    const txtURLId = `txtURL${label}`;

    return (
        <div className="frontDesk">
            Enter URL of {label}:
            <input
                id={txtURLId}
                className="url"
                placeholder={`https://raw.githubusercontent.com/user/repository/${label}.md`}
            ></input>
            <button
                id="btnLoad"
                className="buttonGo"
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
            {/* Previously Accessed Story Buttons */}
            {storage.entryCount > 0 &&
                storage.getURLs().map((urlObj: any) => (
                    <p>
                        <button
                            className="urlLink"
                            onClick={() => {
                                location.search =
                                    "?" +
                                    (urlObj.param ?? "url") +
                                    "=" +
                                    urlObj.url;
                            }}
                        >
                            <p className="pTitle">
                                {urlObj.title ?? urlObj.url}
                            </p>
                            <p className="pInfo">{urlObj.author ?? ""}</p>
                            <p className="pInfo">
                                {urlObj.chapterCount
                                    ? urlObj.chapterCount + " Chapters"
                                    : ""}
                            </p>
                        </button>
                    </p>
                ))}
        </div>
    );
}

export default FrontDesk;
