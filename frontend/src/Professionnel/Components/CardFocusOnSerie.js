import React, { useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import ReactPlayer from 'react-player';
import { Stack } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import { verificationCloudinaryFocus } from '../../Helpers/ServiceApi';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

export default function CardFocusOnSerie(props) {
    const { playActive, setPlayActive, img, title, focus } = props;

    const [play, setPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const AudioRef = useRef(null);
    const urlAudio = verificationCloudinaryFocus('/' + focus?.podcast);

    // auto pause et play
    useEffect(() => {
        if (playActive === focus.id && play) {
            setPlay(true);
        } else {
            setPlay(false);
        }
    }, [playActive, focus, play]);

    // toogle play
    const handleTooglePlay = () => {
        setPlayActive(focus.id);
        if (AudioRef.current) {
            if (play) {
                setPlay(false);
            } else {
                setPlay(true);
                if (AudioRef.current.currentTime > 0) {
                    AudioRef.current.currentTime = 0;
                }
            }
        }
    };

    const formatTime = (second) => {
        const minutes = Math.floor(second / 60);
        const remainingSeconds = Math.floor(second % 60);
        const formattedMinute = String(minutes).padStart(2, "00");
        const formattedSeconds = String(remainingSeconds).padStart(2, "00");
        return (
            <p>
                {formattedMinute} : {formattedSeconds}
            </p>
        );
    };

    return (
        <div className={
            playActive !== focus.id ?
                'focus-card' : 'focus-card focus-active'
        }
            style={{ background: `url(${img})` }}
        >
            <div className='image'>
                <div className='titre-focus'>
                    <p>{title}</p>
                </div>
                <div className='actions'>
                    <Stack direction='row' spacing='0' style={{ display: 'flex', alignItems: 'center' }}>
                        <ReactPlayer
                            ref={AudioRef}
                            playing={play}
                            controls={false}
                            url={urlAudio}
                            height={1}
                            width={1}
                            loop
                            onProgress={(second) => setDuration(second.playedSeconds)}
                        />
                        <div className='pause'
                            onClick={handleTooglePlay}
                        >
                            {
                                play ?
                                    <PauseRoundedIcon sx={{ color: '#FFF', width: '50px', height: '50px' }} />
                                    :
                                    <PlayArrowRoundedIcon sx={{ color: '#FFF', width: '50px', height: '50px' }} />
                            }
                        </div>
                        <div className='stop'
                            onClick={() => {
                                AudioRef.current.seekTo(0);
                                setPlay(false);
                            }}
                        >
                            <StopRoundedIcon sx={{ color: '#FFF', width: '20px', height: '20px' }} />
                        </div>
                    </Stack>
                    <div className='time'>
                        <p>{formatTime(duration)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

CardFocusOnSerie.propTypes = {
    playActive: PropTypes.string.isRequired,
    setPlayActive: PropTypes.func.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    focus: PropTypes.object.isRequired,
};