"use strict";
import { Paragraph } from "../System/Paragraph";

export class Chapter{
    constructor(text) {
        this.text = text;        
        this._lines = text.split('\n').map(line => line.trim()).filter(line=>line);
        this.title = this._lines[0];
        this.title1 = this.title.split(" ")[0].trim();
        this.paragraphs = this._lines.map(line => new Paragraph(line));
    }

    analyze(characterList) {
        this.paragraphs.forEach(p => p.analyze(characterList));
    }
}