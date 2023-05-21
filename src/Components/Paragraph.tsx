"use strict";
import Word from "../Components/Word";
import { Chapter } from "../System/Chapter";

interface Props {
    paragraph: string;
    searchWords: Chapter[];
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
