"use strict";

const storageName = "StoryViewerStorage";

export class Storage {
    constructor() {
        this.storageName = "StoryViewerStorage";
        this.storage = {
            storyLinks: [],
        };
        this.loadStorage();
        this.saveStorage();
        window.onbeforeunload = this.saveStorage;
        window.onblur = this.saveStorage;
    }

    saveStorage() {
        localStorage.setItem(this.storageName, JSON.stringify(this.storage));
    }

    loadStorage() {
        let content = localStorage.getItem(this.storageName);
        if (content == 'undefined') {
            content = null;
        }
        if (!content?.trim()) {
            content = null;
        }
        this.storage = JSON.parse(content) ?? this.storage;
    }

    storeURL(url, storyInfo) {
        let story = storyInfo?.story ?? storyInfo;
        let urlObj = this.storage.storyLinks[url] ?? {};
        //
        urlObj.url = url;
        urlObj.title = storyInfo?.title ?? story?.title ?? urlObj.title;
        //
        this.storage.storyLinks[url] = urlObj;
    }
}