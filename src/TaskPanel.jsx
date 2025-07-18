import React from 'react';
import './scss/TaskPanel.scss';
import { useState } from 'react';
import Pusk from './Pusk'
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import windowStore from './windowStore'
import walletStore from './walletStore'

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
            {puskOpened && <Pusk onClick={() => { setpuskOpened(false) }} />}
            <div className='TaskPanel_wrapper free_img'>
                <div className='TaskPanel window'>
                    <div className='TaskPanel_left'>
                        <div className='TaskPanel_left_left'>
                            <button className={`TaskPanel_tab TaskPanel_win ${puskOpened && 'buttonPressed'}`} onClick={() => { setpuskOpened(!puskOpened) }}>
                                <div className='TaskPanel_win_img_pc'>
                                    <img src='/img/logo.png' alt='decor' />
                                </div>
                                <div className='TaskPanel_win_img_mob'>
                                    <img src='/img/burger.png' alt='decor' />
                                </div>
                                <div className='TaskPanel_tab_text'>
                                    $Knut
                                </div>
                            </button>
                            {
                                windowStore.getOpenedWindows().map((window, key) => {
                                    return <button className='TaskPanel_tab' key={`tab-${key}`} onClick={() => { windowStore.setWindowStatus(window, windowStore.getWindowStatus(window) === 'opened' ? 'minimized' : 'opened') }}>
                                        <img src={`/img/links/${window}Link.png`} alt='decor' />
                                        <div className='TaskPanel_tab_text'>
                                            {capitalizeFirstLetter(window)}
                                        </div>
                                    </button>
                                })
                            }
                        </div>
                        <div className='TaskPanel_left_right'>
                            <button className='TaskPanel_tab' onClick={() => { walletStore.changeWalletConnectedStatus() }}>
                                <img src={`/img/phantom.png`} alt='decor' />
                                <div className='TaskPanel_tab_text TaskPanel_tab_ph'>
                                    {
                                        walletStore.wallet ? <>
                                            {walletStore.wallet.slice(0, 4)}...
                                            {walletStore.wallet.slice(-4)}
                                        </> : <>Connect Phantom</>
                                    }
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='TaskPanel_right'>
                        <div className='TaskPanel_media'>
                            <a href="https://x.com/knutfanpage?s=21&t=H7dk8e7qY0TSyg4v3SbSFw" target='_blank'>
                                <img src='/img/media/x.png' alt='decor' />
                            </a>
                            <a href="https://t.me/knutonsol" target='_blank'>
                                <img src='/img/media/tg.png' alt='decor' />
                            </a>
                            <a href="https://dexscreener.com/solana/8ztb9xdw33yjhfwlxc9u9jox6sbd4x2rzsxm5g1z78e3" target='_blank'>
                                <img src='/img/media/bird.png' alt='decor' />
                            </a>
                            <a href="https://discord.gg/kSsdkkHmNU" target='_blank'>
                                <img src='/img/media/ds.png' alt='decor' />
                            </a>
                        </div>
                        <div className='TaskPanel_vl'></div>
                        <div className='TaskPanel_stat likeButton'>
                            <div className='TaskPanel_vol' onClick={() => { windowStore.setWindowStatus('player', 'opened') }}>
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

export default observer(TaskPanel)

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Преобразование 24-часового формата в 12-часовой
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

function capitalizeFirstLetter(str) {
    if (str === 'flappyLeaderboard' || str === 'wackLeaderboard' || str === 'snakeLeaderboard' || str === 'tttLeaderboard' || str === 'minesweeperLeaderboard') {
        return 'Leaderboard'
    }

    if (str === 'team') {
        return 'Backers'
    }


    if (!str) return str;  // Проверка на пустую строку
    return str.charAt(0).toUpperCase() + str.slice(1);
}