"use strict";
import { Interweave, InterweaveProps, Node } from "interweave";
import { Chapter } from "../System/Chapter";
import { mmd } from "../Utility/mmd";

interface Props {
    paragraph: string;
    searchWords: Chapter[];
    id: string;
    setSearchTerm: (searchTerm: string | undefined) => void;
}

function Paragraph({ paragraph, searchWords, id, setSearchTerm }: Props) {
    let mmdParagraph: string = mmd(paragraph);
    mmdParagraph = addWordButtons(mmdParagraph, searchWords, setSearchTerm);
    return (
        <>
            <p id={id}>
                {/* <Interweave
                    // content={mmdParagraph}
                    content={`<a onclick="alert('hi! it worked');">this is a test ${id}</a>`}
                    allowAttributes={true}
                    onAfterParse={inflate}
                    disableFilters={true}
                ></Interweave> */}
                
            </p>
        </>
    );
}

function addWordButtons(
    paragraph: string,
    searchWords: any[],
    setSearchTerm: (searchTerm: string | undefined) => void
) {
    return paragraph
        .split(" ")
        .map((word) => tryConvertWordToButton(word, searchWords, setSearchTerm))
        .join(" ");
}

function tryConvertWordToButton(
    word: string,
    searchWords: any[],
    setSearchTerm: (searchTerm: string | undefined) => void
) {
    word = word.trim();
    const character = searchWords.find(
        (search) =>
            word.includes(search.name) ||
            search.nicknames.some((nickname: string) => word.includes(nickname))
    );
    let capital = undefined;
    let startIndex = -1;
    let endIndex = word.length;
    for (let i = 0; i < word.length; i++) {
        let char = word.charAt(i);
        if (
            startIndex < 0 &&
            char == char.toUpperCase() &&
            char.toUpperCase() != char.toLowerCase()
        ) {
            startIndex = i;
            capital = char;
        } else {
            //2023-05-21: copied from: https://stackoverflow.com/a/32567789/2336212
            let isLetter = char.toLowerCase() != char.toUpperCase();
            if (!isLetter) {
                endIndex = i;
                break;
            }
        }
    }
    if (character || capital) {
        const name = character
            ? word.includes(character.name)
                ? character.name
                : character.nicknames.find((nickname: string) =>
                      word.includes(nickname)
                  )
            : word.substring(startIndex, endIndex);
        word = ` ${word} `;
        let sections = word.split(name);
        sections.splice(1, 0, name);
        sections = sections.filter((str) => str?.trim());
        return sections
            .map((section) =>
                section == name
                    ? `<a
                            class="moreInfo"
                            onclick="alert('${character?.name ?? name}');"
                        >${section}</a>`
                    : section
            )
            .join("");
    }
    //nothing special to do here, just return the same input
    return word;
}
function inflate(nodes: Node[], props: InterweaveProps): Node[] {
    // function inflate(element: HTMLElement, children: Node[], config: NodeConfig): React.ReactNode
    // nodes
    //     .filter((node) => node?.props?.tagName == "a")
    //     .forEach((node, i) => {
    //         node.props.attributes.onclick = node.props.attributes.click;
    //         console.log("node_" + i, node);
    //     });
    return nodes;
}

export default Paragraph;
