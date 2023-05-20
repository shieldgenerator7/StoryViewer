"use strict";

class Story{
    constructor(text){
        this.chapters = [];
        this.text = text;
        this.lines = text.split('\n');
    }
}

export default Story;