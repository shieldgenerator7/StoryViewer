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
    }

    analyze() {
        this.story?.analyze(this.characters ?? []);
    }//
}
