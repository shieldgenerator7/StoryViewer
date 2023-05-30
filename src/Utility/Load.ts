"use strict";
import * as Fetch from "../Utility/Fetch";
import { StoryInfo } from "../System/StoryInfo";
import { Story } from "../System/Story";

export function loadFile(
    url: string,
    setStory: (story: Story, callback?: Function) => void,
    setStoryInfo: (storyInfo: StoryInfo, callback?: Function) => void
) {
    if (url) {
        Fetch.fetchFile(url, (text: string) => {
            if (url.endsWith(".md")) {
                processMD(text, setStory);
            } else if (url.endsWith(".json")) {
                processJSON(text, url, setStoryInfo);
            }
        });
    }
}

export function processMD(
    text: string,
    setStory: (story: Story, callback?: Function) => void
) {
    setStory(new Story(text));
}

export function processJSON(
    text: string,
    url: string,
    setStoryInfo: (storyInfo: StoryInfo, callback?: Function) => void
) {
    let storyInfo = new StoryInfo();
    let urls = JSON.parse(text);
    let baseURL = url.substring(0, url.lastIndexOf("/")) + "/";
    Fetch.fetchFile(baseURL + urls.story, (txt: string) => {
        storyInfo.story = new Story(txt);
        setStoryInfo?.(storyInfo);
    });
    Fetch.fetchFile(baseURL + urls.characters, (txt: string) => {
        storyInfo.characters = JSON.parse(txt);
        setStoryInfo?.(storyInfo);
    });
    storyInfo.title = urls.title;
    storyInfo.author = urls.author;
    storyInfo.year = urls.year;
    setStoryInfo?.(storyInfo);
}
