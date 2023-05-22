"use strict";
import { Story } from "../System/Story";
import { Chapter } from "../System/Chapter";
import { StoryInfo } from "../System/StoryInfo";

interface Props {
    searchTerm?: string;
    story?: Story;
    storyInfo?: StoryInfo;
}

function InfoPanel({ searchTerm, story, storyInfo }: Props) {
    if (!searchTerm) {
        return <></>;
    }
    let character = storyInfo?.characters.find(
        (char: any) =>
            char.name == searchTerm || char.nicknames.includes(searchTerm)
    );
    if (!character) {
        //TODO: allow searching terms that aren't predefined by the author
        return <></>;
    }
    let foundList: any[] = [];
    story ??= storyInfo?.story;
    story?.chapters.forEach((chapter: Chapter, chIndex: number) => {
        chapter.lines.forEach((paragraph: string, pIndex: number) => {
            let found =
                paragraph.includes(character.name) ||
                character.nicknames.some((nickname: string) =>
                    paragraph.includes(nickname)
                );
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
                <p>{character.name}</p>
                <p>{character.description}</p>
                {Object.keys(character).map((key) => (
                    <p>
                        {key}: {character[key]}
                    </p>
                ))}
                {foundList.map((entry: any) => (
                    <button
                        className="searchResult"
                        onClick={() => {
                            document
                                .getElementById(
                                    `p${entry.chIndex}-${entry.pIndex}`
                                )
                                ?.scrollIntoView();
                        }}
                    >
                        {entry.paragraph}
                    </button>
                ))}
            </div>
        </>
    );
}

export default InfoPanel;
