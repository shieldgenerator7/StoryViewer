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
            <div>
                {storage.entryCount > 0 &&
                    storage.getURLs().map((urlObj: any) => (
                        <p>
                            <a
                                href={`https://shieldgenerator7.github.io/StoryViewer/?url=${urlObj.url}`}
                            >
                                {urlObj.title ?? urlObj.url}
                            </a>
                        </p>
                    ))}
            </div>
        </>
    );
}

export default FrontDesk;
