import React from "react";
import { SkipPrevious, SkipNext } from "@material-ui/icons";
import PlayPauseButton from "./PlayPauseButton";
import "./musicPlayerStyles.css"

const MiniMuiscArt = ({ playPause, data, playNext, playPrevious, showHideCallback, showHidePlayerContent }) => {


    if (data !== null) {
        return (
            <div className="player-content">
                <div id="album-art" className={showHidePlayerContent ? 'active' : ''}>
                    <img src={data.thumbnail} className={showHidePlayerContent ? 'active' : ''} />
                    <div id="buffer-box">Buffering ...</div>
                </div>
                <div className="player-controls" >
                    <div className="control">
                        <div className="button">
                            <SkipPrevious style={{ fontSize: "3em", opacity: ".8" }} onClick={playPrevious} />
                        </div>
                        <div className="button">
                            <PlayPauseButton player={playPause.player} audioState={playPause.audioState} showHideCallback={showHideCallback} />
                        </div>
                        <div className="button">
                            <SkipNext style={{ fontSize: "3em", opacity: ".8" }} onClick={playNext} />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div />)
    }
}

export default MiniMuiscArt