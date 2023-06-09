"use strict";
import Word from "../Components/Word";
import { Chapter } from "../System/Chapter";

interface Props {
    paragraph: string;
    searchWords: Chapter[];
    id: string;
    setSearchTerm: (searchTerm: string | undefined) => void;
}

function Paragraph({ paragraph, searchWords, id, setSearchTerm }: Props) {
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
                            setSearchTerm={setSearchTerm}
                        />{" "}
                    </>
                ))}
            </p>
        </>
    );
}

export default Paragraph;
