"use strict";

interface Props {
    word: string;
    searchWords: any[];
}

function Word({ word, searchWords }: Props) {
    word = word.trim();
    const character = searchWords.find(
        (search) =>
            word.includes(search.name) ||
            search.nicknames.some((nickname: string) => word.includes(nickname))
    );
    if (character) {
        const name = word.includes(character.name)
            ? character.name
            : character.nicknames.find((nickname: string) =>
                  word.includes(nickname)
              );
        word = ` ${word} `;
        let sections = word.split(name);
        sections.splice(1, 0, name);
        sections = sections.filter((str) => str?.trim());
        //console.log(sections);
        return (
            <>
                {sections.map((section) => (
                    <>
                        {section != name && section}
                        {section == name && (
                            <a
                                className="moreInfo"
                                onClick={() =>
                                    alert(
                                        Object.keys(character)
                                            .map(
                                                (key) =>
                                                    `${key}: ${character[key]}`
                                            )
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
