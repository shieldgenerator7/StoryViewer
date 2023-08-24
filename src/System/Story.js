"use strict";
import { Chapter } from "../System/Chapter";

export class Story {
    constructor(text, title) {
        this.chapters = [];
        this.text = text;
        this.title = title;
        //find chapter split by the "#" symbol,
        //adding a newline to the start to detect headers on line 1
        this.chapters = ("\n" + text)
            .split(/\n *# +/)
            .filter((str) => str?.trim())
            .map((text, index) => new Chapter(text, index));
        this.title ??= this.chapters[0].title;
    }

    analyze(characterList) {
        this.chapters.forEach(chapter => chapter.analyze(characterList));
    }
}
