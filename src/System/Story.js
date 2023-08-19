"use strict";
import { Chapter } from "../System/Chapter";

export class Story {
    constructor(text, title) {
        this.chapters = [];
        this.text = text;
        this.title = title;
        this.chapters = text
            .split("#")
            .filter((str) => str?.trim())
            .map((text) => new Chapter(text));
        this.title ??= this.chapters[0].title;
    }

    analyze(characterList) {
        this.chapters.forEach(chapter => chapter.analyze(characterList));
    }
}
