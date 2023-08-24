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
        let storage = this;
        window.onbeforeunload = () => { storage.saveStorage(); };
        window.onblur = () => { storage.saveStorage(); };
        //TEST
        window.storage = this;
    }

    _updateEntryCount() {
        this.entryCount = this.storage.storyLinks.length;
    }

    saveStorage() {
        let stringify = JSON.stringify(this.storage);
        localStorage.setItem(this.storageName, stringify);
        console.log("saveStorage", stringify);
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
        console.log("loadStorage", this.storage);
    }

    storeURL(url, storyInfo, param) {
        // console.log("storeURL called 1: ", url, this.storage);
        let story = storyInfo?.story ?? storyInfo;
        let urlObj = this.storage.storyLinks.find(obj => obj.url == url) ?? {};
        //
        urlObj.url = url;
        urlObj.title = storyInfo?.title ?? story?.title ?? urlObj.title;
        if (param) {
            urlObj.param = param;
        }
        urlObj.author = storyInfo?.author;
        urlObj.chapterCount = story?.chapters?.length;
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