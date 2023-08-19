"use strict";

export class StoryInfo {
    constructor(story, characters) {
        this.story = story;
        this.characters = characters;
        this.title = undefined;
        this.author = undefined;
        this.year = undefined;
        this.lastupdated = undefined;

        if (this.story && this.characters) {
            this.analyze();
        }

        //
        //2023-08-19: TEST
        //
        let _global = window;
        let storyInfo = this;
        _global.getParagraph = (ci, pi) => {
            return storyInfo.story.chapters[ci].paragraphs[pi];
        };
        //
    }

    analyze() {
        this.story?.analyze(this.characters ?? []);
    }//
}
