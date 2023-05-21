"use strict";
import { Chapter } from "./System/Chapter";

interface Props {
    word: string;
    searchWords: Chapter[];
}

function Word({ word, searchWords }: Props) {
    word = word.trim();
    const containedSearchWord = searchWords.find((search) =>
        word.includes(search.title1)
    );
    if (containedSearchWord) {
        word = ` ${word} `;
        let sections = word.split(containedSearchWord.title1);
        sections.splice(1, 0, containedSearchWord.title1);
        sections = sections.filter((str) => str?.trim());
        //console.log(sections);
        return (
            <>
                {sections.map((section) => (
                    <>
                        {section != containedSearchWord.title1 && section}
                        {section == containedSearchWord.title1 && (
                            <a
                                className="moreInfo"
                                onClick={() =>
                                    alert(
                                        containedSearchWord.lines
                                            .filter((line: string) => line)
                                            .join("\n")
                                    )
                                }
                            >
                                {section}
                            </a>
                        )}
                    </>
                ))}
            </>
        );
    }
    return <>{word}</>;
}

export default Word;
