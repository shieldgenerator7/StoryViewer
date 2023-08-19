"use strict";

const regexContainsCapital = /.*[A-Z]/;
const regexAlphaNumericOnly = /[A-Za-z0-9]+/;

const pronounList = [
    "he", "him", "his",
    "she", "her", "hers",
    "they", "them", "their", "theirs",
    "it", "its",
];

export class Paragraph {
    constructor(text) {
        this.text = text;
        this.character = undefined;
        this.referenceList = [];
        this.characterList = [];//list of characters referenced in this paragraph
    }

    analyze(characterList, lastCharacter) {
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
        return this._analyzeCharacterReferences(characterList, this.character ?? lastCharacter);
    }

    _analyzeCharacterReferences(characterList, lastCharacter) {
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
                    lastCharacter = char;
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
            //check to see if word is a pronoun
            if (!reference) {
                let pronoun = pronounList.find(pronoun =>
                    word.match(regexAlphaNumericOnly)?.[0].toLowerCase() == pronoun
                );
                if (pronoun) {
                    pronoun = word.match(regexAlphaNumericOnly)[0];
                    //record this reference in this list,
                    //even if we dont know who its refering to
                    reference = {
                        character: lastCharacter ?? undefined,
                        name: pronoun,
                        index: index,
                    };
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
        //Update characterList
        this.characterList = [];
        for (let i in this.referenceList) {
            let reference = this.referenceList[i];
            if (reference.character) {
                if (!this.characterList.includes(reference.character)) {
                    this.characterList.push(reference.character);
                }
            }
        }
        //
        return lastCharacter;
    }
}