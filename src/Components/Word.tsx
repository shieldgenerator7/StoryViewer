"use strict";

interface Props {
    word: string;
    searchWords: any[];
}

function Word({ word, searchWords }: Props) {
    word = word.trim();
    const containedSearchWord = searchWords.find((search) =>
        word.includes(search.name)
    );
    if (containedSearchWord) {
        word = ` ${word} `;
        let sections = word.split(containedSearchWord.name);
        sections.splice(1, 0, containedSearchWord.name);
        sections = sections.filter((str) => str?.trim());
        //console.log(sections);
        return (
            <>
                {sections.map((section) => (
                    <>
                        {section != containedSearchWord.name && section}
                        {section == containedSearchWord.name && (
                            <a
                                className="moreInfo"
                                onClick={() =>
                                    alert(
                                        Object.entries(containedSearchWord)
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
