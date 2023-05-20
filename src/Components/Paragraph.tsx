"use strict";

interface Props {
    paragraph: string;
}

function Paragraph({ paragraph }: Props) {
    const searchWord = "dwarf";
    const words = paragraph.split(" ");
    return (
        <>
            <p>
                {words.map((word) => (
                    <>
                        {word != searchWord && word + " "}
                        {word == searchWord && (
                            <a
                                className="moreInfo"
                                onClick={() => alert(searchWord)}
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
