"use strict";

interface Props {
    paragraph: string;
}

function Paragraph({ paragraph }: Props) {
    return (
        <>
            <p>{paragraph}</p>
        </>
    );
}

export default Paragraph;
