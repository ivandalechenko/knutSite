import React, { useEffect, useRef, useState } from 'react';
import './scss/Player.scss';
import Window from './Window';
import audioStore from './audioStore';
import PlayerVolume from './PlayerVolume';
import PlayerDuration from './PlayerDuration';
import { observer } from 'mobx-react-lite';

const Player = (props) => {
    const audioRef = useRef(null);
    const [currentTime, setcurrentTime] = useState(0);
    const [duration, setduration] = useState(0);

    useEffect(() => {
        if (audioStore.play) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [audioStore.play]);

    useEffect(() => {
        const updateCurrentTime = () => {
            if (audioRef.current) {
                setcurrentTime(Math.floor(audioRef.current.currentTime));
                audioStore.position = +((audioRef.current.currentTime / duration) * 100).toFixed(2);
            }
        };

        // Обновляем текущее время каждые 500 миллисекунд
        const intervalId = setInterval(updateCurrentTime, 500);
        return () => clearInterval(intervalId);
    }, [audioStore.play, duration]); // Добавляем duration как зависимость

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = (duration / 100) * audioStore.newPos; // Устанавливаем текущее время
        }
    }, [audioStore.newPos, duration]);

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            audioStore.currentSongIndex = (audioStore.currentSongIndex + 1) % audioStore.songs.length;
            audioStore.newPos = 0 + Math.random() / 10
        };

        const handleLoadedMetadata = () => {
            setduration(audio.duration); // Устанавливаем длительность трека
            audio.currentTime = (duration / 100) * audioStore.newPos; // Устанавливаем текущее время
        };

        if (audio) {
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            return () => {
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, [audioStore.currentSongIndex]); // Добавляем currentSongIndex как зависимость

    useEffect(() => {
        audioRef.current.src = audioStore.songs[audioStore.currentSongIndex];
        if (audioStore.play) {
            audioRef.current.play();
        }
    }, [audioStore.currentSongIndex]);

    useEffect(() => {
        audioRef.current.volume = audioStore.volume / 100; // Установка громкости
    }, [audioStore.volume]);

    return (
        <Window type='player'>
            <audio ref={audioRef} />
            <div className='Player_wrapper'>
                <div className='Player'>
                    <div className='Player_top'>
                        <div className='Player_time'>
                            {formatTime(currentTime)}
                        </div>
                        <div className='Player_info'>
                            <div className='Player_name'>
                                <div className='Player_name_text'>
                                    {audioStore.songs[audioStore.currentSongIndex].slice(7)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {audioStore.songs[audioStore.currentSongIndex].slice(7)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {audioStore.songs[audioStore.currentSongIndex].slice(7)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {audioStore.songs[audioStore.currentSongIndex].slice(7)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {audioStore.songs[audioStore.currentSongIndex].slice(7)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {audioStore.songs[audioStore.currentSongIndex].slice(7)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {audioStore.songs[audioStore.currentSongIndex].slice(7)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {audioStore.songs[audioStore.currentSongIndex].slice(7)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                            <div className='Player_controls'>
                                <div className='Player_controls_time'>
                                    <img src='/img/music/prev.svg' alt='decor' onClick={() => { audioStore.prevSong() }} />
                                    <img src='/img/music/play.svg' onClick={() => { audioStore.play = true }} alt='decor' />
                                    <img src='/img/music/pause.svg' onClick={() => { audioStore.play = false }} alt='decor' />
                                    <img src='/img/music/next.svg' alt='decor' onClick={() => { audioStore.nextSong() }} />
                                </div>
                                <PlayerVolume />
                            </div>
                        </div>
                    </div>
                    <PlayerDuration />
                </div>
                <div className='Player_playlists'>
                    <div className='Player_playlists_header'>
                        Playlists
                    </div>

                    {
                        ['Main', 'LifeStyle', 'Driving', 'FRED', 'ChillMorning', 'Party', 'Relaxation', 'Romantic', 'Workouts',].map((ps) => {
                            return <div className={`Player_playlists_element ${audioStore.category === ps && 'Player_playlists_element_selected'}`} onClick={() => { audioStore.changeCategory(ps) }}>
                                {ps}
                            </div>
                        })
                    }

                </div>
            </div>
        </Window>
    );
}

export default observer(Player);

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
