"use strict";

export class Chapter{
    constructor(text) {
        this.text = text;        
        this.lines = text.split('\n').map(line => line.trim()).filter(line=>line);
        this.title = this.lines[0];
        this.title1 = this.title.split(" ")[0].trim();
    }
}