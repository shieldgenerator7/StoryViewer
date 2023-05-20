"use strict";

class Story{
    constructor(url, number){
        this.chapters = [];
        this.url = url;
        this.number = number * 10;
    }
}

export default Story;