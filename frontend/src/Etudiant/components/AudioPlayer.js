import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { AudioContext } from '../../Context/AudioContext ';
import Slider from '@mui/material/Slider';
import './style/AudioPlayer.scss'
import { BaseURL } from '../../Helpers/InstanceAxionsAdmin';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Cancel } from "@mui/icons-material"
import Skeleton from '@mui/material/Skeleton';
import Marquee from "react-fast-marquee";
import FavoriteOutlinedIcon from '@mui//icons-material/FavoriteOutlined';
import { GET_USER_INFO_CONNECT } from '../../Reducers/ReducerUser';
import { useDispatch, useSelector } from 'react-redux';
import { focusLikeAction } from '../../Actions/ActionFocus';

export default function AudioPlayer() {
    const {
        DataNext,
        focusData,setfocusData,
        playingFocusFooter,setPlayingFocusFooter,

    } = useContext(AppContext)
    const { duration,isPlaying, progress, playPause, seek,
        volume,
    handleVolume
    } = useContext(AudioContext);
    
    const [Like_Active, setLike_Active] = useState(false);
    const user_connect = useSelector(GET_USER_INFO_CONNECT)
    const dispatch = useDispatch()


    const handleLikeFocus = async () => {
        const user_id = user_connect.id
        const focus_id = focusData.id
        const formdata = { user_id, focus_id }
        await dispatch(focusLikeAction(formdata)).then(res => {
          // add data
          // setfocusData({ ...res })
          setfocusData({ ...res })
          //  if user like
          if (res.liked_by.includes(user_connect.id)) {
            setLike_Active(true)
          } else {
            setLike_Active(false)
          }
        })
      }


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
        <div id="AudioPlayer">
            <div className="AudioPlayer-slider">
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={progress}
                    min={0}
                    step={1}
                    max={duration || 0}
                    onChange={(e) => seek(e.target.value)}
                    id="AudioPlayer_ligne_progressA"
                    sx={{
                    color:'#f49030',
                    height: 4,
                    '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&:before': {
                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0px 0px 0px 8px 'rgb(255 255 255 / 16%)'}`,
                        },
                        '&.Mui-active': {
                        width: 20,
                        height: 20,
                        },
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.28,
                    },
                }}
                />
            </div>

            <div className="AudioPlayer_content">
                {/* left */}
                <div className="AudioPlayer_left">
                    <div className="AudioPlayer_left_img">
                        {
                            focusData ? (
                                <img src={`${BaseURL + focusData.bg}`} alt={focusData.bg} />
                            ) : (<Skeleton variant="rounded" width={40} height={40} />)
                        }
                    </div>
                    <div className="AudioPlayer_left_dec">
                        {
                            focusData && (
                            <Marquee direction="left" speed={50} gradient={false}>
                                <h4>{focusData.titre}</h4>
                            </Marquee>)
                        }
                        <span>{formatTime(progress)} min</span>
                    </div>
                </div>
            </div>
            {/* center */}
            <div className="AudioPlayer_center">
                <div className="AudioPlayer_center_card">
                    <ShuffleOutlinedIcon onClick={playPause} className="AudioPlayer_icon" />
                </div>
                <div className="AudioPlayer_center_card">
                    <SkipPreviousOutlinedIcon onClick={playPause} className="AudioPlayer_icon" />
                </div>
                <div className="AudioPlayer_center_card">
                    {isPlaying ? (
                    <PauseCircleIcon onClick={playPause} className="AudioPlayer_icon_pause" />) : (
                    <PlayCircleFilledWhiteIcon onClick={playPause} className="AudioPlayer_icon_pause" />
                    )}
                </div>
                <div className="AudioPlayer_center_card">
                    <SkipNextOutlinedIcon onClick={playPause} className="AudioPlayer_icon" />
                </div>
                <div className="AudioPlayer_center_card">
                    <CachedOutlinedIcon onClick={playPause} className="AudioPlayer_icon" />
                </div>
            </div>

            <div className="FooterFocusLire_right">
          <div className="FooterFocusLire_center_card">
            {/* FocusBanner_btn_icon */}
            {
              Like_Active ? (<FavoriteOutlinedIcon className="Active_focus" onClick={handleLikeFocus} />) : (
                <FavoriteBorderOutlinedIcon className="UnActive_focus" onClick={handleLikeFocus} />)
            }
          </div>
          <div className="FooterFocusLire_center_card">
            <ChatBubbleOutlineOutlinedIcon className="FooterFocusLire_icon" />
          </div>
          {/* <div className="FooterFocusLire_center_card">
            <ReplyOutlinedIcon className="FooterFocusLire_icon" />
          </div> */}
          
              <div className='FooterFocusLire_volume'>
                    <div className="FooterFocusLire_center_card">
                    <VolumeUpOutlinedIcon className="FooterFocusLire_volume_icon" />
                    </div>
                    <input
                    type="range"
                    id='FooterFocusLire_volume_input'
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e)=>handleVolume(e.target.value)}
                    />
              </div>
            
        </div>

    </div>
  );
}
