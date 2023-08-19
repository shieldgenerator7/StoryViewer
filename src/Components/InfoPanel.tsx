"use strict";
import { Story } from "../System/Story";
import { Chapter } from "../System/Chapter";
import { Paragraph } from "../System/Paragraph";
import { StoryInfo } from "../System/StoryInfo";
import * as Select from "../Utility/Select";
import { Character } from "../System/Character";
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
        (char: Character) =>
            char.name == searchTerm || char.nicknames.includes(searchTerm)
    );
    let foundList: any[] = [];
    story ??= storyInfo?.story;
    story?.chapters.forEach((chapter: Chapter, chIndex: number) => {
        chapter.paragraphs.forEach((paragraph: Paragraph, pIndex: number) => {
            let found =
                (character &&
                    (character == paragraph.character ||
                        paragraph.characterList.includes(character))) ||
                paragraph.text.includes(searchTerm);
            if (found) {
                foundList.push({
                    chIndex: chIndex,
                    pIndex: pIndex,
                    paragraph: paragraph.text,
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
                    <>
                        <div>
                            <img
                                className="portrait"
                                src={character.portraitURL}
                            ></img>
                        </div>
                        <div>
                            {character.portraitCredit?.trim() && (
                                <span className="imageCredit">
                                    Source: {character.portraitCredit}
                                </span>
                            )}
                        </div>
                    </>
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
