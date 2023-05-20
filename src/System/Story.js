"use strict";

class Story{
    constructor(text){
        this.chapters = [];
        this.text = text;
        this.chapters = text.split('#').map(text => new Chapter(text));
    }
}