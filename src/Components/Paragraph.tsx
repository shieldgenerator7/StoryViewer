"use strict";
import Word from "./Word";

interface Props {
    paragraph: string;
    searchWords: string[];
    id: string;
}

function Paragraph({ paragraph, searchWords, id }: Props) {
    const words = paragraph.split(" ");
    return (
        <>
            <p id={id}>
                {words.map((word, index) => (
                    <>
                        <Word
                            key={index}
                            word={word}
                            searchWords={searchWords}
                        />{" "}
                    </>
                ))}
            </p>
        </>
    );
}

export default Paragraph;
