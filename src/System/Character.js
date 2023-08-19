"use strict";

export class Character {
    constructor() {
        this.name = "unnamed";
        this.nicknames = [];
        this.id = "AAA";//the short id used to identify characters when it's not obvious, format: @AAA
        this.portrait = -1; //image
        this.portraitURL = " ";
        this.portraitCredit = " ";
        this.description = "No description given";
        //information given is going to vary by story, so this can't be all filled out right here
    }

    hasKey(key) {
        return true && this[key];
    }
}

export const defaultCharacter = new Character();
