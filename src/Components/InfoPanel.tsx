"use strict";
import { Story } from "../System/Story";
import { Chapter } from "../System/Chapter";
import { StoryInfo } from "../System/StoryInfo";
import * as Select from "../Utility/Select";
import { defaultCharacter } from "../System/Character";

interface Props {
    searchTerm?: string;
    story?: Story;
    storyInfo?: StoryInfo;
    setSearchTerm?: (searchTerm: string | undefined) => void;
}

function InfoPanel({ searchTerm, story, storyInfo, setSearchTerm }: Props) {
    if (!searchTerm) {
        return <></>;
    }
    let character = storyInfo?.characters?.find(
        (char: any) =>
            char.name == searchTerm || char.nicknames.includes(searchTerm)
    );
    let foundList: any[] = [];
    story ??= storyInfo?.story;
    story?.chapters.forEach((chapter: Chapter, chIndex: number) => {
        chapter.lines.forEach((paragraph: string, pIndex: number) => {
            let found =
                (character &&
                    (paragraph.includes(character.name) ||
                        character.nicknames.some((nickname: string) =>
                            paragraph.includes(nickname)
                        ))) ||
                paragraph.includes(searchTerm);
            if (found) {
                foundList.push({
                    chIndex: chIndex,
                    pIndex: pIndex,
                    paragraph: paragraph,
                });
            }
        });
    });

    return (
        <>
            <div className="infoPanel">
                {setSearchTerm && (
                    <button
                        className="closeX"
                        onClick={() => setSearchTerm(undefined)}
                    >
                        X
                    </button>
                )}
                {character?.portraitURL?.trim() && (
                    <div>
                        <img
                            className="portrait"
                            src={character.portraitURL}
                        ></img>
                        {character.portraitCredit?.trim() && (
                            <span className="imageCredit">Source: {character.portraitCredit}</span>
                        )}
                    </div>
                )}
                <p>{character?.name ?? searchTerm}</p>
                {character && (
                    <>
                        <p>{character.description}</p>
                        {Object.keys(character)
                            .filter(
                                (key: string) => !defaultCharacter.hasKey(key)
                            )
                            .map((key) => (
                                <p>
                                    {key}: {character[key]}
                                </p>
                            ))}
                    </>
                )}
                <span className="searchCount">
                    References: {foundList.length}
                </span>
                {foundList.map((entry: any) => (
                    <button
                        className="searchResult"
                        onClick={() => {
                            let pId = `p${entry.chIndex}-${entry.pIndex}`;
                            document.getElementById(pId)?.scrollIntoView();
                            Select.selectText(pId);
                        }}
                    >
                        <span className="searchResultIndex">
                            {entry.chIndex}-{entry.pIndex}
                        </span>
                        {entry.paragraph}
                    </button>
                ))}
            </div>
        </>
    );
}

export default InfoPanel;
