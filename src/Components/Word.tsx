"use strict";

interface Props {
    word: string;
    searchWords: string[];
}

function Word({ word, searchWords }: Props) {
    word = word.trim();
    const containedSearchWord = searchWords.find((search) =>
        word.includes(search)
    );
    if (containedSearchWord) {
        word = ` ${word} `;
        let sections = word.split(containedSearchWord);
        sections.splice(1, 0, containedSearchWord);
        sections = sections.filter((str) => str?.trim());
        //console.log(sections);
        return (
            <>
                {sections.map((section) => (
                    <>
                        {section != containedSearchWord && section}
                        {section == containedSearchWord && (
                            <a
                                className="moreInfo"
                                onClick={() => alert(section)}
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
