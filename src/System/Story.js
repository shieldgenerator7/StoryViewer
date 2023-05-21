"use strict";
import { Chapter } from "../System/Chapter";

export class Story{
    constructor(text){
        this.chapters = [];
        this.text = text;
        if (text) {
            this.chapters = text.split('#')
                .filter(str => str?.trim())
                .map(text => new Chapter(text));
        }
    }
}