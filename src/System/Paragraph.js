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
const pronounDict = {
    Male: [
        "i", "me", "my", "mine",
        "you", "your", "yours",
        "he", "him", "his",
    ],
    Female: [
        "i", "me", "my", "mine",
        "you", "your", "yours",
        "she", "her", "hers",
    ],
    Neutral: [
        "i", "me", "my", "mine",
        "you", "your", "yours",
        "they", "them", "their", "theirs",
        "it", "its",
    ],
};

export class Paragraph {
    constructor(text) {
        this.text = text;
        this.character = undefined;
        this.referenceList = [];
        this.characterList = [];//list of characters referenced in this paragraph
        this.quoteList = [];//list of when quotes open and close
        this.lastCharacter = undefined;//last character mentioned in this paragraph
        this.prevParagraph = undefined;
    }

    analyze(characterList) {
        //Find the character that owns this paragraph, if any
        this._parseCharId(characterList);
        //Analyze other character references
        this._analyzeCharacterReferences(characterList);
        this._analyzePronounReferences();
        //try to get an owner if none yet
        this._findOwner();
        //Analyze quotes
        this._analyzeQuotes(characterList);
    }

    _parseCharId(characterList) {
        let char = characterList.find(char => this.text.startsWith(char.id));
        if (char) {
            this.character = char;
            //remove character's id from the beginning of the paragraph
            this.text = this.text.substring(char.id.length);
            //remove colon from beginning of paragraph, if it's there
            if (this.text.startsWith(":")) {
                this.text = this.text.substring(1);
            }
        }
    }

    _analyzeQuotes(characterList) {
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
            quote.character = lastQuote?.character
                ?? this.character
                ?? this.lastCharacter
                ?? this.prevParagraph.lastCharacter;
        }
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
                    this.lastCharacter = char;
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
        this._updateCharacterList();
    }

    _updateCharacterList() {
        this.characterList = [];
        if (this.character) {
            this.characterList.push(this.character);
        }
        for (let i in this.referenceList) {
            let reference = this.referenceList[i];
            if (reference.character) {
                if (!this.characterList.includes(reference.character)) {
                    this.characterList.push(reference.character);
                }
            }
        }
    }

    _analyzePronounReferences() {
        let words = this.text.split(" ");
        //check each word to see if its a pronoun reference to a character
        words.forEach((word, index) => {
            let reference = this.referenceList[index];
            //if this reference doesnt have a character yet,
            if (!reference?.character) {
                //check to see if word is a pronoun
                let pronoun = pronounList.find(pronoun =>
                    word.match(regexAlphaNumericOnly)?.[0].toLowerCase() == pronoun
                );
                if (pronoun) {
                    pronoun = word.match(regexAlphaNumericOnly)[0];
                    let character = this.getCharacter(
                        index,
                        (char) => this.doesPronounMatchCharacter(pronoun, char)
                    )
                        ?? this.character
                        ?? undefined;
                    //record this reference in this list,
                    //even if we dont know who its refering to
                    reference = {
                        character: character,
                        name: pronoun,
                        index: index,
                    };
                    //register reference
                    this.referenceList[index] = reference;
                };
            }
        });
        //
        this._updateCharacterList();
    }

    _findOwner() {
        if (this.character) {
            return;
        }
        //check refs: one char
        if (this.characterList.length == 1) {
            this.character = this.characterList[0];
            return;
        }
        //check refs: multiple chars
        if (this.characterList.length > 1) {
            let countDict = {};
            this.characterList.forEach(char => countDict[char.name] = 0);
            this.referenceList
                .filter(ref => ref?.character)
                .forEach(ref => countDict[ref.character.name]++);
            let char = this.characterList.reduce((c1, c2) =>
                (countDict[c1.name] >= countDict[c2.name]) ? c1 : c2
            );
            this.character = char;
            return;
        }
        //check prev paragraph
        if (this.quoteList.length == 0 || this.prevParagraph?.quoteList.length == 0) {
            this.character = this.prevParagraph?.character;
            return;
        }
        //check prev prev paragraph
        this.character = this.prevParagraph?.prevParagraph?.character
            ?? this.prevParagraph?.character;
    }

    /**
     * Returns the most probable character relevant to the given index
     * @precondition Assumes the character reference list has been constructed
     * @param {Number} index The index from which to start searching
     * @param {(char: Character) => boolean} filterFunc The function to filter the character (optional)
     */
    getCharacter(index, filterFunc = (char) => char) {
        if (index < 0) {
            index = this.referenceList.length + index;
        }
        //Search backwards
        for (let i = index; i >= 0; i--) {
            let char = this.referenceList[i]?.character;
            if (char && filterFunc(char)) {
                return char;
            }
        }
        //Search forwards
        for (let i = index; i < this.referenceList.length; i++) {
            let char = this.referenceList[i]?.character;
            if (char && filterFunc(char)) {
                return char;
            }
        }
        //Use owning character 
        if (this.character && filterFunc(this.character)) {
            return this.character;
        }
        //Search prev paragraph
        let char = this.prevParagraph?.getCharacter(-1, filterFunc);
        if (char && filterFunc(char)) {
            return char;
        }
        return undefined;
    }

    doesPronounMatchCharacter(pronoun, character) {
        //default: match
        if (!character.gender) {
            return true;
        }
        //
        pronoun = pronoun.toLowerCase();
        return pronounDict[character.gender]?.includes(pronoun) ?? true;
    }
}