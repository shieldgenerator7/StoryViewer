"use strict";

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
                        {!searchWords.includes(word) && word + " "}
                        {searchWords.includes(word) && (
                            <a
                                className="moreInfo"
                                onClick={() => alert(word)}
                            >
                                {word + " "}
                            </a>
                        )}
                    </>
                ))}
            </p>
        </>
    );
}

export default Paragraph;
