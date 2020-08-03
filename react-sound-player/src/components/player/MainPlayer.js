import React, { useEffect, useContext, useState, useRef } from 'react'
import { GlobalContext } from "../GlobalState"
import MusicArt from './MusicArt';
import TimeLineController from './TimelineController'
import getTracks from "../../api/getTracks";
import "./musicPlayerStyles.css"

const MainPlayer = () => {

    const [{ themeSelectValue }] = useContext(GlobalContext);
    const [audioState, setAudioState] = useState(null); //4 states, loading, loaded, playing, paused
    const [playerState, setPlayerState] = useState("minimized"); //2 states, maximized, minimized
    const [minimized, setMinimized] = useState(true);
    const [trackUrl, setTrackUrl] = useState(null);
    const [tracksList, setTrackList] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [showHidePlayerContent, setShowHidePlayerContent] = useState(false);

    const audioPlayer = useRef();
    const containerRef = useRef(null);
    const player = audioPlayer.current;
    const body = document.querySelector("body");

    useEffect(() => {
        if (tracksList.length === 0) {
            console.log("state change triggered");
            getAudio();
        } else {
            setCurrentTrack(tracksList[0]);
            audioPlayer.current.src = tracksList[0].trackUrl;
        }
    }, [tracksList])


    async function getAudio() {
        setAudioState("Loading....");
        const res = await getTracks.get();
        setTrackList(res.data.tracks);
        setAudioState("loaded");
    }

    const playNext = () => {
        let actual = tracksList[seekCurrentIndex() + 1];
        setCurrentTrack(actual)
        audioPlayer.current.src = actual.trackUrl;
    }

    const playPrevious = () => {
        if (player.currentTime > 5) {
            player.currentTime = 0;
        } else {
            let index = seekCurrentIndex();
            if (index !== -1) {
                let current = tracksList[seekCurrentIndex() - 1];
                setCurrentTrack(current)
                audioPlayer.current.src = current.trackUrl;
            } else {
                player.currentTime = 0;
            }
        }
    }

    const seekCurrentIndex = () => {
        const currentIndex = tracksList.findIndex(
            track => track.id === currentTrack.id
        );
        return currentIndex;
    }

    const songEnded = () => {
        playNext();
    }

    const showHideCallback = (isHide) => {
        setShowHidePlayerContent(isHide)
    }

    const returnPlayer = () => {
        return (
            <div className="container">
                <div className="player-wrapper">
                    <div id="player-track" className={showHidePlayerContent ? 'active' : ''}>
                        <TimeLineController audioState={audioState} player={player} data={currentTrack} />
                    </div>
                    <MusicArt
                        playPause={{
                            player: player,
                            audioState: audioState

                        }}
                        playNext={e => {
                            e.stopPropagation();
                            playNext()

                        }}
                        playPrevious={e => {
                            e.stopPropagation();
                            playPrevious()
                        }}
                        data={currentTrack}
                        showHideCallback={showHideCallback}
                        showHidePlayerContent={showHidePlayerContent}
                    />
                </div>
            </div>
        )
    }

    return (
        <div>
            {returnPlayer()}
            <audio
                // onTimeUpdate={timeUpdate}
                onLoadStart={() => {
                    setAudioState("loaded");
                }}
                id="audio-element"
                // crossOrigin="anonymous"
                onPlay={() => setAudioState("playing")}
                onPlaying={() => setAudioState("playing")}
                onPause={() => setAudioState("paused")}
                onEnded={songEnded}
                // autoPlay
                ref={audioPlayer}
            // type="audio/mp4"
            />
        </div>
    )

}

export default MainPlayer