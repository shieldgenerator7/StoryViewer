"use strict";
import Word from "./Word";

interface Props {
    paragraph: string;
    searchWords: string[];
}

function Paragraph({ paragraph, searchWords }: Props) {
    const words = paragraph.split(" ");
    return (
        <>
            <p>
                {words.map((word) => (
                    <>
                        <Word
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
