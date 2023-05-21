"use strict";

class Character {
    constructor() {
        this.name = "unnamed";
        this.nicknames = [];
        this.portraitURL = "image.png";
        this.description;
        //information given is going to vary by story, so this can't be all filled out right here
    }
}

export const defaultCharacter = new Character();
