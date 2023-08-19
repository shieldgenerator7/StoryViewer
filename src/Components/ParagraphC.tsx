"use strict";
import { Paragraph } from "../System/Paragraph";
import { mmd } from "../Utility/mmd";

interface Props {
    paragraph: Paragraph;
    id: string;
    setSearchTerm: (searchTerm: string | undefined) => void;
}

function ParagraphC({ paragraph, id }: Props) {
    let mmdParagraph: string = mmd(paragraph.text);
    mmdParagraph = addWordButtons(paragraph, mmdParagraph);
    return (
        <>
            <p
                id={id}
                dangerouslySetInnerHTML={{ __html: mmdParagraph }}
            ></p>
        </>
    );
}

function addWordButtons(paragraph: Paragraph, html: string) {
    return html
        .split(" ")
        .map((word, index) =>
            tryConvertWordToButton(word, paragraph.referenceList[index])
        )
        .join(" ");
}

function tryConvertWordToButton(word: string, reference: any) {
    //no reference, so just return the word
    if (!reference) {
        return word;
    }
    //character reference or capital word
    const name = reference.name;
    word = word.split('@')[0].trim();
    word = ` ${word} `;
    let sections = word.split(name);
    sections.splice(1, 0, name);
    sections.forEach((str) => str?.trim());
    return sections
        .filter((str) => str)
        .map((section) =>
            section == name
                ? `<a
                        class="moreInfo"
                        onclick="window.setSearchTerm('${
                            reference.character?.name ?? name
                        }');"
                    >${section}</a>`
                : section
        )
        .join("");
}

export default ParagraphC;
