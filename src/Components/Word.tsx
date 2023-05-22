"use strict";

interface Props {
    word: string;
    searchWords: any[];
    setSearchTerm: (searchTerm: string | undefined) => void;
}

function Word({ word, searchWords, setSearchTerm }: Props) {
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
        return (
            <>
                {sections.map((section) => (
                    <>
                        {section != name && section}
                        {section == name && (
                            <a
                                className="moreInfo"
                                onClick={() =>
                                    setSearchTerm(character?.name ?? name)
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
