"use strict";
import { Markup } from "interweave";
import Word from "../Components/Word";
import { Chapter } from "../System/Chapter";
import { mmd } from "../Utility/mmd";

interface Props {
    paragraph: string;
    searchWords: Chapter[];
    id: string;
    setSearchTerm: (searchTerm: string | undefined) => void;
}

function Paragraph({ paragraph, searchWords, id, setSearchTerm }: Props) {
    let mmdParagraph: string = mmd(paragraph);
    mmdParagraph = addWordButtons(mmdParagraph, searchWords, setSearchTerm);
    return (
        <>
            <p id={id}>
                <Markup content={mmdParagraph}></Markup>
            </p>
        </>
    );
}

function addWordButtons(
    paragraph: string,
    searchWords: any[],
    setSearchTerm: (searchTerm: string | undefined) => void
) {
    return paragraph
        .split(" ")
        .map((word) => tryConvertWordToButton(word, searchWords, setSearchTerm))
        .join(" ");
}

function tryConvertWordToButton(
    word: string,
    searchWords: any[],
    setSearchTerm: (searchTerm: string | undefined) => void
) {
    word = word.trim();
    const character = searchWords.find(
        (search) =>
            word.includes(search.name) ||
            search.nicknames.some((nickname: string) => word.includes(nickname))
    );
    let capital = undefined;
    let startIndex = -1;
    let endIndex = word.length;
    for (let i = 0; i < word.length; i++) {
        let char = word.charAt(i);
        if (
            startIndex < 0 &&
            char == char.toUpperCase() &&
            char.toUpperCase() != char.toLowerCase()
        ) {
            startIndex = i;
            capital = char;
        } else {
            //2023-05-21: copied from: https://stackoverflow.com/a/32567789/2336212
            let isLetter = char.toLowerCase() != char.toUpperCase();
            if (!isLetter) {
                endIndex = i;
                break;
            }
        }
    }
    if (character || capital) {
        const name = character
            ? word.includes(character.name)
                ? character.name
                : character.nicknames.find((nickname: string) =>
                      word.includes(nickname)
                  )
            : word.substring(startIndex, endIndex);
        word = ` ${word} `;
        let sections = word.split(name);
        sections.splice(1, 0, name);
        sections = sections.filter((str) => str?.trim());
        return sections
            .map((section) =>
                section == name
                    ? `<a
                            class="moreInfo"
                            onClick="${setSearchTerm.name}(${
                                character?.name ?? name
                            })"
                        >${section}</a>`
                    : section
            )
            .join("");
    }
    //nothing special to do here, just return the same input
    return word;
}

export default Paragraph;
