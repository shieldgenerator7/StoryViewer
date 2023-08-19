"use strict";

const regexContainsCapital = /.*[A-Z]/;
const regexAlphaNumericOnly = /[A-Za-z0-9]+/;

export class Paragraph {
    constructor(text) {
        this.text = text;
        this.character = undefined;
        this.referenceList = [];
    }

    analyze(characterList) {
        let idList = characterList.map(char => char.id);
        let char = characterList.find(char => this.text.startsWith(char.id));
        //Find the character that owns this paragraph, if any
        if (char) {
            this.character = char;
            //remove character's id from the beginning of the paragraph
            this.text = this.text.substring(char.id.length);
            //remove colon from beginning of paragraph, if it's there
            if (this.text.startsWith(":")) {
                this.text = this.text.substring(1);
            }
        }
        //Analyze other character references
        this._analyzeCharacterReferences(characterList);
    }

    _analyzeCharacterReferences(characterList) {
        this.referenceList = [];
        //here, a word is defined as a contiguous string of non-space letters, numbers, or symbols
        let words = this.text.split(" ");
        //check each word to see if its a reference to a character
        words.forEach((word, index) => {
            let reference = undefined;
            //check each character to see if its referenced to by this word
            for (let char of characterList) {
                let name = char.getIdentifierUsed(word);
                if (name) {
                    //record this reference in this list
                    reference = {
                        character: char,
                        name: name,
                        index: index,
                    };
                    //found the character, continue to next word
                    break;
                }
            }
            //check to see if word is capitalized
            if (!reference) {
                if (regexContainsCapital.test(word)) {
                    let name = word.match(regexAlphaNumericOnly)[0];
                    reference = {
                        name: name,
                        index: index,
                    }
                }
            }
            //register reference
            if (reference) {
                this.referenceList[index] = reference;
            }
        });
    }
}