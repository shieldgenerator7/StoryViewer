"use strict";
import {Story} from "../System/Story"

interface Props{
    searchTerm?: string,
    story?: Story
}

function InfoPanel({searchTerm, story }:Props) {
    return(<><div className ="infoPanel">Info Panel</div> </>);
}

export default InfoPanel;

