import React, { useState, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupAdmin from './Admin/Pages/Signup/SignupAdmin';
import HomeAdmin from './Admin/Pages/HomeAdmin/HomeAdmin';
import Home from './Global/Home/Home'
import LogIn from './Global/LogIn/LogIn'
import Subscribe from './Global/Subscribe/Subscribe'
import LoginAdmin from './Admin/Pages/Login/LoginAdmin';
import ProfessionelsAdmin from './Admin/Pages/Professionels/ProfessionelsAdmin';
import AdminUserList from './Admin/Pages/AdminUserList/AdminUserList';
import Notification from './Global/Notification/Notification';
import Profiluser from './Admin/Pages/ProfilUser/Profiluser'
import PrivateRoutes from './Helpers/PrivateRoutes';
import Focus from './Etudiant/pages/Focus';
import Zone from './Etudiant/pages/Zone';
import PlayZone from './Etudiant/pages/PlayZone'
import Highlights from './Etudiant/pages/Highlights';
import FilActualite from './Etudiant/pages/FilActualite';
import PublicationMurEtudiant from './Etudiant/pages/PublicationMurEtudiant'
import HighlightMurEtudiant from './Etudiant/pages/HighlightMurEtudiant'
import ShowHighlight from './Etudiant/pages/ShowHighlight'
import ProfShow from './Admin/Pages/ProfShow/ProfShow';
import Createurs from './Etudiant/pages/Createurs';
import FocusLire from './Etudiant/pages/FocusLire';
import { AppContext } from './Context/AppContext';
import { BaseURL } from './Helpers/InstanceAxionsAdmin';
import NotificationsEtudiant from './Etudiant/pages/NotificationsEtudiant';
import ProfilPro from './Etudiant/pages/ProfilPro';
import ViewAllFocusPro from './Etudiant/pages/ViewAllFocusPro';
import CommentFocus from './Etudiant/pages/CommentFocus';
import MessageListUser from './Global/Message/Pages/MessageListUser'
import Message from './Global/Message/Pages/message'


function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [PlayPause, setPlayPause] = useState(false)
  const [ActiveFootFocus, setActiveFootFocus] = useState(false)
  const [AudioFile, setAudioFile] = useState(null)
  const [Uuid, setUuid] = useState(null)

  // =====================STATE FOR FOCUS======================
  const AudioRef = useRef(null);
  const [VolumeFooter, setVolumeFooter] = useState(0.5)
  const [DataNext, setDataNext] = useState(null)
  const [focusData, setfocusData] = useState(null)
  const [focusCurrent, setfocusCurrent] = useState(0)
  // const [indexNext, setIndexNext] = useState(0)
  const waveformRef = useRef(null);
  const [randomMode, setRandomMode] = useState(false);
  // const [mutedFocus, setMutedFocus] = useState(false);
  const [playingFocus, setPlayingFocus] = useState(false);
  const [playingFocusFooter, setPlayingFocusFooter] = useState(false);

  const [openModalComment, setOpenModal] = useState(false)
  const [TimingSlide, setTimingSlide] = useState(false)
  const [initialSliding, setInitialSliding] = useState(0)

  const toggleSliding = () => {
    setTimingSlide(TimingSlide ? false : true)
  }

  //filtre recherche
  const [searchInput,setSearchInput] = useState('')

  const toggleOpenModal = () => {
    console.log('modale')
    setOpenModal(!openModalComment)
  }

  // ===========FOCUS================
  
  const handleAleatoirFocus = useCallback(() => {
    setRandomMode(!randomMode);
  }, [randomMode]);

  // replay focus
  const handleReplayFocus = () => {
    if (AudioRef.current && AudioFile) {
        AudioRef.current.currentTime = 0
    }
  }

  // next focus
  const handleNextFoucs = () => {
    if (DataNext && focusData) {
      const focusIndex = DataNext.findIndex((focus) => focus.id === focusData.id);
      if (focusIndex !== -1 && focusIndex < DataNext.length - 1) {
        const nextFocus = DataNext[focusIndex + 1];
        setfocusData(nextFocus);
        const audioLink = `${BaseURL}${nextFocus.podcast}`;
        setAudioFile(audioLink);
        waveformRef.current.load(audioLink);
        waveformRef.current.play();
      }
    }
  }

  // Prev focus
  const handlePrevFoucs = () => {
    if (DataNext && focusData) {
      DataNext.forEach((focus, index) => {
        // data length
        // get ide prev
        if (focus.id === focusData.id) {
          let newIndex = index - 1;
          // last lenght
          let dataLength=DataNext.length-1;
          console.log('dataLength=>', dataLength)
          console.log('newIndex=>', newIndex)
          if(newIndex<0){
            let newData = DataNext[dataLength]
            // setIndexNext(dataLength)
            setfocusData(newData)
            const audioLink = `${BaseURL}${newData.podcast}`
            setAudioFile(audioLink)
          }else{
            let newData = DataNext[newIndex]
            // setIndexNext(newIndex)
            setfocusData(newData)
            const audioLink = `${BaseURL}${newData.podcast}`
            setAudioFile(audioLink)
          }
        }

      })
    }
  }

  // ===========FOCUS Play================
  const handlePlayFocus = async () => {
    setPlayingFocus(true)
    // await AudioRef.current.play()
    setPlayPause(true)
  }

  // ===========FOCUS pause================
  const handlePauseFocus = async () => {
    // await AudioRef.current.pause();
    setPlayPause(false)
    setPlayingFocus(false)
  }

  // ===========FOCUS ACTIVE PAUSE================
  const handleActiveFooterFocus = async () => {
    setActiveFootFocus(!ActiveFootFocus)
  }

  // footer focus
  const handleVolumeFooter = (e) => {
    setVolumeFooter(e.target.value)
    if (AudioRef.current) {
      AudioRef.current.volume = VolumeFooter
    }
  }

  return (
    <AppContext.Provider
      value={{
        playingFocusFooter,
        setPlayingFocusFooter,
        // handlePauseFocus,
        // handlePlayFocus,
        darkMode,
        setDarkMode,
        AudioRef,
        AudioFile,
        setAudioFile,
        PlayPause,
        // handleNextFoucs,
        // handlePrevFoucs,
        // handleReplayFocus,
        // handleAleatoirFocus,
        ActiveFootFocus,
        setActiveFootFocus,
        handleActiveFooterFocus,
        setfocusData,
        focusData,
        focusCurrent,
        setfocusCurrent,
        // waveformRef,
        DataNext,
        setDataNext,
        VolumeFooter,
        // handleVolumeFooter,
        Uuid,
        setUuid,
        randomMode,
        TimingSlide,
        toggleSliding,
        setTimingSlide,
        initialSliding,
        setInitialSliding,
        toggleOpenModal,
        openModalComment,
        setOpenModal,
        searchInput,
        setSearchInput
      }}
    >
      <div className={darkMode ? "app dark" : "app "}>
        <BrowserRouter>
          <Routes>
            {/* routes clients */}
            <Route path='/' element={<Home />}></Route>
            <Route path='/inscription' element={<Subscribe />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/etudiant/decouvrir' element={<PrivateRoutes><FilActualite /></PrivateRoutes>}></Route>
            <Route path='/etudiant/Createurs' element={<PrivateRoutes><Createurs /></PrivateRoutes>}></Route>
            <Route path='/etudiant/Focus' element={<PrivateRoutes><Focus /></PrivateRoutes>}></Route>
            <Route path='/etudiant/Focus/:id' element={<PrivateRoutes><FocusLire /></PrivateRoutes>}></Route>
            <Route path='/etudiant/Highlights' element={<PrivateRoutes><Highlights /></PrivateRoutes>}></Route>
            <Route path='/etudiant/Highlights/:id' element={<PrivateRoutes><ShowHighlight /></PrivateRoutes>}></Route>
            <Route path='/etudiant/notifications' element={<PrivateRoutes><NotificationsEtudiant /></PrivateRoutes>}></Route>
            <Route path='/etudiant/Focus/:id/listen' element={<PrivateRoutes><CommentFocus /></PrivateRoutes>}></Route>
            <Route path='/etudiant/Highlights/:id' element={<PrivateRoutes><ShowHighlight /></PrivateRoutes>}></Route>

            <Route path='/etudiant/createur/:id/viewallfocuspro' element={<PrivateRoutes><ViewAllFocusPro /></PrivateRoutes>}></Route>
            <Route path='/etudiant/createur/:id/' element={<PrivateRoutes><ProfilPro /></PrivateRoutes>}></Route>
            <Route path='/etudiant/showhighlight' element={<PrivateRoutes><ShowHighlight /></PrivateRoutes>}></Route>

            <Route path='/etudiant/messages/' element={<PrivateRoutes><MessageListUser /></PrivateRoutes>}></Route>
            <Route path='/etudiant/messages/:matricule' element={<PrivateRoutes><Message /></PrivateRoutes>}></Route>

            {/* Routes pour le mur Etudiant */}
            <Route path='/etudiant/profil/publication/' element={<PrivateRoutes><PublicationMurEtudiant /></PrivateRoutes>}></Route>
            <Route path='/etudiant/profil/highlight/' element={<PrivateRoutes><HighlightMurEtudiant /></PrivateRoutes>}></Route>
            {/* <Route path='/profil/:matricule' element={<PrivateRoutes><Notifications /></PrivateRoutes>}></Route> */}
            {/* routes admin */}
            <Route path='/admin' element={<PrivateRoutes><HomeAdmin /></PrivateRoutes>}></Route>
            <Route path='/admin-login' element={<PrivateRoutes><LoginAdmin /></PrivateRoutes>}></Route>
            <Route path='/admin-pro' element={<PrivateRoutes><ProfessionelsAdmin /></PrivateRoutes>}></Route>
            <Route path='/admin-pro/:id' element={<PrivateRoutes><ProfShow /></PrivateRoutes>}></Route>
            <Route path='/admin-users' element={<PrivateRoutes><AdminUserList /></PrivateRoutes>}></Route>
            <Route path='/admin-users/:id' element={<PrivateRoutes><Profiluser /></PrivateRoutes>}></Route>
            <Route path='/admin-signup' element={<PrivateRoutes><SignupAdmin /></PrivateRoutes>}></Route>
            <Route path='/admin-notification' element={<Notification />}></Route>
            {/* 404 */}
            <Route path='*' element={<PrivateRoutes><FilActualite /></PrivateRoutes>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;