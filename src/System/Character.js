"use strict";

export class Character {
    constructor() {
        this.name = "unnamed";
        this.nicknames = [];
        this.id = "AAA";//the short id used to identify characters when it's not obvious, format: @AAA
        this.gender = undefined;//"Male","Female","Neutral"
        this.portrait = -1; //image
        this.portraitURL = " ";
        this.portraitCredit = " ";
        this.description = "No description given";
        //information given is going to vary by story, so this can't be all filled out right here
    }

    hasKey(key) {
        return true && this[key];
    }

    /**
     * Returns true if the given text identifies this character
     * @param {string} text The text to search through
     */
    isIdentifiedBy(text) {
        return text.includes(this.id) ||
            text.includes(this.name) ||
            this.nicknames.some(nickname =>
                text.includes(nickname)
            );
    }

    /**
     * Returns the first identifier found in the given text:
     * The order searched for: id, name, nickname
     * Returns undefined if nothing found
     * @param {string} text The text to search through
     */
    getIdentifierUsed(text) {
        //id
        if (text.includes(this.id)) {
            return this.id;
        }
        //name
        if (text.includes(this.name)) {
            return this.name;
        }
        //nicknames
        for (let nickname of this.nicknames) {
            if (text.includes(nickname)) {
                return nickname;
            }
        };
        //nothing found
        return undefined;
    }
}

export const defaultCharacter = new Character();
