import React from 'react';
import './scss/TaskPanel.scss';
import { useState } from 'react';
import Pusk from './Pusk'
import { useEffect } from 'react';
const TaskPanel = (props) => {
    const [puskOpened, setpuskOpened] = useState(false);
    const [time, settime] = useState(getCurrentTime());
    let timeInt;
    useEffect(() => {
        timeInt = setInterval(() => {
            settime(getCurrentTime())
        }, 1000);
        return () => {
            clearInterval(timeInt)
        }
    }, [])


    return (
        <>
            {puskOpened && <Pusk></Pusk>}
            <div className='TaskPanel_wrapper free_img'>
                <div className='TaskPanel window'>
                    <div className='TaskPanel_left'>
                        <button className={`TaskPanel_tab TaskPanel_win ${puskOpened && 'buttonPressed'}`} onClick={() => { setpuskOpened(!puskOpened) }}>
                            <img src='/img/logo.png' alt='decor' />
                            <div className='TaskPanel_tab_text'>
                                $Knut
                            </div>
                        </button>
                        <button className='TaskPanel_tab'>
                            <img src='/img/links/whitepaperLink.png' alt='decor' />
                            <div className='TaskPanel_tab_text'>
                                Whitepaper
                            </div>
                        </button>
                    </div>
                    <div className='TaskPanel_right'>
                        <div className='TaskPanel_media'>
                            <a href="https://telegram.org/" target='_blank'>
                                <img src='/img/media/x.png' alt='decor' />
                            </a>
                            <a href="https://telegram.org/" target='_blank'>
                                <img src='/img/media/tg.png' alt='decor' />
                            </a>
                            <a href="https://telegram.org/" target='_blank'>
                                <img src='/img/media/bird.png' alt='decor' />
                            </a>
                        </div>
                        <div className='TaskPanel_vl'></div>
                        <div className='TaskPanel_stat likeButton'>
                            <div className='TaskPanel_vol'>
                                <img src='/img/volume.png' alt='decor' />
                            </div>
                            <div className='TaskPanel_time'>
                                {time}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskPanel

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Преобразование 24-часового формата в 12-часовой
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}