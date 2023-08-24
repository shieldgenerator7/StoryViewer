"use strict";
import { Paragraph } from "../System/Paragraph";

export class Chapter {
    constructor(text, index) {
        this.text = text;
        this.number = undefined;
        this.index = index;
        this._lines = text.split('\n').map(line => line.trim()).filter(line => line);
        this.title = this._lines[0];
        this.title1 = this.title.split(" ")[0].trim();
        this.paragraphs = this._lines.map(line => new Paragraph(line));
        //
        this.analyzeTitle();
    }

    analyzeTitle() {
        //analyze chapter number
        //title has number
        let number = this.title.match(/[0-9]+/)?.[0];
        if (number != undefined) {
            this.number = number;
            return;
        }
        //title is prologue
        if (this.title.toLowerCase().includes("prologue")) {
            this.number = "P";
            return;
        }
        //title is epilogue
        if (this.title.toLowerCase().includes("epilogue")) {
            this.number = "E";
            return;
        }
        //Default: Title is Title
        if (this.index == 0) {
            this.number = "T";
            return;
        }
        //Default: just use index
        this.number = this.index;
    }

    analyze(characterList) {
        //analyze characters
        let lastParagraph = undefined;
        this.paragraphs.forEach(p => {
            p.prevParagraph = lastParagraph;
            p.analyze(characterList);
            lastParagraph = p;
        });
    }

    getLabelShort() {
        //Title
        if (this.number == "T") {
            return "Title";
        }
        //Prologue
        else if (this.number == "P") {
            return "Prologue";
        }
        //Epilogue
        else if (this.number == "E") {
            return "Epilogue";
        }
        //Chapter #
        let isNumber = /[0-9]+/.test(`${this.number}`);
        if (isNumber) {
            return `Ch${this.number}`;
        }
        //Index
        return `Ch${this.index}`;
    }
}