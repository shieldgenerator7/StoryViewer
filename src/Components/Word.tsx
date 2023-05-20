"use strict";

interface Props {
    word: string;
    searchWords: Chapter[];
}

function Word({ word, searchWords }: Props) {
    word = word.trim();
    const containedSearchWord = searchWords.find((search) =>
        word.includes(search.title)
    );
    if (containedSearchWord) {
        word = ` ${word} `;
        let sections = word.split(containedSearchWord.title);
        sections.splice(1, 0, containedSearchWord.title);
        sections = sections.filter((str) => str?.trim());
        //console.log(sections);
        return (
            <>
                {sections.map((section) => (
                    <>
                        {section != containedSearchWord.title && section}
                        {section == containedSearchWord.title && (
                            <a
                                className="moreInfo"
                                onClick={() =>
                                    alert(
                                        containedSearchWord.lines
                                            .filter((line) => line)
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
    return word;
}

export default Word;
