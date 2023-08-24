"use strict";
import { Paragraph } from "../System/Paragraph";

export class Chapter {
    constructor(text, number) {
        this.text = text;
        this.number = number;
        this._lines = text.split('\n').map(line => line.trim()).filter(line => line);
        this.title = this._lines[0];
        this.title1 = this.title.split(" ")[0].trim();
        this.paragraphs = this._lines.map(line => new Paragraph(line));
    }

    analyze(characterList) {
        //analyze chapter number
        let number = this.title.match(/[0-9]+/)?.[0];
        if (number != undefined) {
            this.number = number;
        }
        //analyze characters
        let lastParagraph = undefined;
        this.paragraphs.forEach(p => {
            p.prevParagraph = lastParagraph;
            p.analyze(characterList);
            lastParagraph = p;
        });
    }

    getLabelShort() {
        let isNumber = /|[0-9]+|/.test(`|${this.number}|`);
        if (isNumber) {
            return (this.number == 0) ? "Title" : `Ch${this.number}`;
        }
        return this.number;
    }
}