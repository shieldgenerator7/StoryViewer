"use strict";
import { Story } from "../System/Story";
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
    if (!character) {//TODO: allow searching terms that aren't predefined by the author
        return <></>;
    }
    return (
        <>
            <div className="infoPanel"><p>{character.name}</p><p>{character.description}</p>
                {Object.keys(character)
                    .map(
                        (key) =>
                            <p>{key}: {character[key]}</p>
                    )}
            </div>
        </>
    );
}

export default InfoPanel;
