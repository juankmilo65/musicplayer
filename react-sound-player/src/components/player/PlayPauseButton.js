
import React from "react";
import { IconButton, CircularProgress } from "@material-ui/core/";
import {
    Pause,
    PlayArrow
} from "@material-ui/icons/";

const PlayPauseButton = ({ player, audioState }) => {
    const togglePlayPause = e => {
        if (audioState === "playing") {
            player.pause();
        } else if (audioState === "paused" || audioState === "loaded") {
            player.play();
        }
        e.stopPropagation();
    };

    const showPlayPause = () => {
        if (audioState === "playing") {
            return <Pause style={{ fontSize: "3em", opacity: ".8" }} onClick={togglePlayPause} />;
        } else if (audioState === "paused" || audioState === "loaded") {
            return <PlayArrow style={{ fontSize: "3em", opacity: ".8" }} onClick={togglePlayPause} />;
        }
    };

    return (
        <div>{showPlayPause()}</div>
    );
}

export default PlayPauseButton;