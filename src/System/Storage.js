"use strict";

const storageName = "StoryViewerStorage";

export class Storage {
    constructor() {
        this.storageName = "StoryViewerStorage";
        this.storage = {
            storyLinks: [],
        };
        this.entryCount = 0;
        this.loadStorage();
        this.saveStorage();
        window.onbeforeunload = this.saveStorage;
        window.onblur = this.saveStorage;
    }

    _updateEntryCount() {
        this.entryCount = this.storage.storyLinks.length;
    }

    saveStorage() {
        let stringify = JSON.stringify(this.storage);
        localStorage.setItem(this.storageName, stringify);
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
        this._updateEntryCount();
    }

    storeURL(url, storyInfo) {
        let story = storyInfo?.story ?? storyInfo;
        let urlObj = this.storage.storyLinks.find(obj => obj.url == url) ?? {};
        //
        urlObj.url = url;
        urlObj.title = storyInfo?.title ?? story?.title ?? urlObj.title;
        //
        if (!this.storage.storyLinks.includes(urlObj)) {
            this.storage.storyLinks.push(urlObj);
        }
        this._updateEntryCount();
    }

    getURLs() {
        return this.storage.storyLinks;
    }
}