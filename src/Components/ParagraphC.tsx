"use strict";
import { Paragraph } from "../System/Paragraph";
import { mmd } from "../Utility/mmd";

interface Props {
    paragraph: Paragraph;
    id: string;
    activeCharName: string | undefined;
}

function ParagraphC({ paragraph, id, activeCharName }: Props) {
    let mmdParagraph: string = mmd(paragraph.text);
    mmdParagraph = addWordButtons(paragraph, mmdParagraph, activeCharName);
    return (
        <>
            <p
                id={id}
                dangerouslySetInnerHTML={{ __html: mmdParagraph }}
            ></p>
        </>
    );
}

function addWordButtons(
    paragraph: Paragraph,
    html: string,
    activeCharName: string | undefined
) {
    return html
        .split(" ")
        .map((word, index) => {
            let quote = paragraph.quoteList[index];
            let canQuote = activeCharName && quote?.character?.name == activeCharName;
            let ref = paragraph.referenceList[index];
            return (
                (canQuote && quote?.open
                    ? `<span class="quoteHighlight">`
                    : "") +
                tryConvertWordToButton(word, ref) +
                (canQuote && quote?.close ? "</span>" : "")
            );
        })
        .join(" ");
}

function tryConvertWordToButton(word: string, reference: any) {
    //no reference, so just return the word
    if (!reference) {
        return word;
    }
    //character reference or capital word
    const name = reference.name;
    word = word.trim();
    word = ` ${word} `;
    if (word.includes("@")) {
        word = word.split("@" + reference.character?.id ?? "AAA").join("");
    }
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
                        title="${reference.character?.name ?? ""}"
                    >${section}</a>`
                : section
        )
        .join("");
}

export default ParagraphC;
