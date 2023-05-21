"use strict";

export class Story{
    constructor(text){
        this.chapters = [];
        this.text = text;
        this.chapters = text.split('#')
            .filter(str => str?.trim())
            .map(text => new Chapter(text));
    }
}