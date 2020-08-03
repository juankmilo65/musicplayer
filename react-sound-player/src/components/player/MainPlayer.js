import React, { useEffect, useState, useRef } from 'react'
import MusicArt from './MusicArt';
import TimeLineController from './TimelineController'
import getTracks from "../../api/getTracks";
import "./musicPlayerStyles.css"

const MainPlayer = () => {
    const [audioState, setAudioState] = useState(null); //4 states, loading, loaded, playing, paused
    const [tracksList, setTrackList] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [showHidePlayerContent, setShowHidePlayerContent] = useState(false);

    const audioPlayer = useRef();
    const player = audioPlayer.current;

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

    const setPrevNext = (index) => {
        let current = tracksList[index];
        setCurrentTrack(current);
        setShowHidePlayerContent(true);
        audioPlayer.current.src = current.trackUrl;
        player.play();
    }

    const playNext = () => {
        let current = seekCurrentIndex() + 1;
        if (tracksList.length !== current) {
            setPrevNext(seekCurrentIndex() + 1);
        }
    }

    const playPrevious = () => {
        if (player.currentTime > 5) {
            player.currentTime = 0;
        } else {
            let index = seekCurrentIndex();
            if (index !== -1 && index !== 0) {
                setPrevNext(seekCurrentIndex() - 1);
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
                onLoadStart={() => {
                    setAudioState("loaded");
                }}
                id="audio-element"
                onPlay={() => setAudioState("playing")}
                onPlaying={() => setAudioState("playing")}
                onPause={() => setAudioState("paused")}
                onEnded={songEnded}
                ref={audioPlayer}
            />
        </div>
    )

}

export default MainPlayer