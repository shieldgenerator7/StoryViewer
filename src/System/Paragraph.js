"use strict";

const regexContainsCapital = /.*[A-Z]/;
const regexAlphaNumericOnly = /[A-Za-z0-9]+/;
const regexQuote = /[\"]/;
const regexQuoteDouble = /\".*\"/;

const pronounList = [
    "i", "me", "my", "mine",
    "you", "your", "yours",
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
        this.quoteList = [];//list of when quotes open and close
        this.prevLastCharacter = undefined;//last character mentioned in previous paragraph
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
        this.prevLastCharacter = lastCharacter;
        lastCharacter = this._analyzeCharacterReferences(characterList, this.character ?? lastCharacter);
        //Analyze quotes
        this._analyzeQuotes(characterList, lastCharacter);
        //
        return lastCharacter;
    }

    _analyzeQuotes(characterList, lastCharacter) {
        this.quoteList = [];
        let words = this.text.split(" ");
        //check each word to see if its a quote
        let openQuote = false;
        let lastQuote = undefined;
        words.forEach((word, index) => {
            if (regexQuote.test(word)) {
                openQuote = !openQuote;
                let quote = {
                    character: lastQuote?.character ?? this.character ?? this.getCharacter(index),
                    open: openQuote,
                    close: !openQuote,
                };
                if (regexQuoteDouble.test(word)) {
                    //assume it's a one-word quote
                    openQuote = !openQuote;
                    quote.close = true;
                }
                lastQuote = (openQuote) ? quote : undefined;
                this.quoteList[index] = quote;
            }
        });
        //check for unclosed quote
        if (openQuote) {
            let index = words.length - 1;
            this.quoteList[index] ??= {};
            let quote = this.quoteList[index];
            quote.close = true;
            quote.character = lastQuote?.character ?? this.character ?? lastCharacter;
        }
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
                    //check if it's a character tag
                    if (word.includes(char.id)) {
                        name = word.split('@')[0];
                    }
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

    /**
     * Returns the most probable character relevant to the given index
     * @precondition Assumes the character reference list has been constructed
     * @param {Number} index 
     */
    getCharacter(index) {
        //Search backwards
        for (let i = index; i >= 0; i--) {
            let char = this.referenceList[index]?.character;
            if (char) {
                return char;
            }
        }
        //Search forwards
        for (let i = index; i < this.referenceList.length; i++) {
            let char = this.referenceList[index]?.character;
            if (char) {
                return char;
            }
        }
        //Use owning character or prevLastCharacter
        return this.character ?? this.prevLastCharacter;
    }
}