"use strict";

class Chapter{
    constructor(text) {
        this.text = text;        
        this.lines = text.split('\n').map(line => line.trim());
        this.title = this.lines[0];
    }
}