import React, { useState, useEffect } from "react";
import { Slider } from "@material-ui/core/";
import "./musicPlayerStyles.css"


const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
};

const TimelineController = ({ audioState, player, data }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (player) {
            setCurrentTime(player.currentTime);
        }
        let setTimeInterval;
        if (audioState === "playing") {
            setTimeInterval = setInterval(() => {
                setCurrentTime(player.currentTime);
                console.log()
            }, 800);
        } else {
            clearInterval(setTimeInterval);
        }
        return () => clearInterval(setTimeInterval);
    }, [audioState, player]);

    const handleChange = (event, newValue) => {
        player.currentTime = newValue;
        setCurrentTime(newValue);
    };

    const showDuration = () => {
        if (player) {
            if (player.duration) {
                return formatTime(player.duration);
            } else {
                return "0:00";
            }
        } else {
            return 0;
        }
    };

    if (data !== null) {
        return (
            <div >
                <div id="album-name">
                    <label >
                        {data.album}
                    </label>
                </div>
                <div id="track-name">
                    <label >
                        {data.trackName}
                    </label>
                </div>
                <div className="track-time">
                    <div className="current-time">
                        <label >
                            {formatTime(currentTime)}
                        </label>
                    </div>
                    <div className="track-length">
                        <label >
                            {showDuration()}
                        </label>
                    </div>

                </div>

                <Slider
                    value={currentTime}
                    onChange={handleChange}
                    max={player ? player.duration : 0}
                />
            </div>
        )
    } else {
        return (
            <div />
        )
    }
}

export default TimelineController;