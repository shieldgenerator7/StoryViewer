"use strict";

export class Paragraph {
    constructor(text) {
        this.text = text;
        this.character = undefined;
    }

    analyze(characterList) {
        let idList = characterList.map(char => char.id);
        let char = characterList.find(char => this.text.startsWith(char.id));
        //Find the character that owns this paragraph, if any
        if (char) {
            this.character = char;
            //remove character's id from the beginning of the paragraph
            this.text = this.text.substring(0, char.id.length);
            //remove colon from beginning of paragraph, if it's there
            if (this.text.startsWith(":")) {
                this.text = this.text.substring(0, 1);
            }
        }
    }
}