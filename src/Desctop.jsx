import React, { useEffect, useState } from 'react';
import './scss/Desctop.scss';
import windowStore from './windowStore'
import { observer } from 'mobx-react-lite';
import walletStore from './walletStore';
import wallpaperStore from './wallpaperStore';

export default observer((props) => {
    const [wallpaper, setwallpaper] = useState(+localStorage.getItem('wallpaper') || 2);
    useEffect(() => {
        setwallpaper(+wallpaperStore.wallpaper)
    }, [wallpaperStore.wallpaper])
    return (
        <div className='Desctop' style={{
            backgroundImage: `url('/img/wallpapers/${wallpaper}-min.webp')`
        }}>
            {
                wallpaper === 1 && <div className='Desctop_bg free_img'>
                    <div className='Desctop_bg_inner'>
                        <video autoPlay muted loop playsInline>
                            <source src="/img/wallpapers/1.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            }

            <div className='Desctop_links'>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('state', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/stateLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        $knut State
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('roadmap', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/roadmapLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Roadmap
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('whitepaper', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>

                        <img src='/img/links/whitepaperLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Whitepaper
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('tokenomics', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>

                        <img src='/img/links/tokenomicsLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Tokenomics
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('milestones', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>

                        <img src='/img/links/milestonesLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Milestones
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('memes', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>

                        <img src='/img/links/memesLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Memes
                    </div>
                </div>
                <div className='Desctop_link' onClick={async () => {
                    if (!walletStore.wallet) {
                        await walletStore.connectWallet()
                    }
                    windowStore.setWindowStatus('TTT', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/TTTLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Tic-tac-toe
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('paint', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>

                        <img src='/img/links/paintLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        knutPaint
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('staking', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/stakingLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Staking
                    </div>
                </div>
                <div className='Desctop_link' onClick={async () => {
                    if (!walletStore.wallet) {
                        await walletStore.connectWallet()
                    }
                    windowStore.setWindowStatus('thimbles', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/thimblesLink.png' className='Desctop_link_img Desctop_link_img_ball' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Thimbles
                    </div>
                </div>
                <div className='Desctop_link' onClick={async () => {
                    if (!walletStore.wallet) {
                        await walletStore.connectWallet()
                    }
                    windowStore.setWindowStatus('flappy', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/flappyLink.png' className='Desctop_link_img Desctop_link_img_ball' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Flappy Knut
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('memeGen', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/memeGenLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Meme Generator
                    </div>
                </div>
                <div className='Desctop_link' onClick={async () => {
                    if (!walletStore.wallet) {
                        await walletStore.connectWallet()
                    }
                    windowStore.setWindowStatus('minesweeper', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/minesweeperLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Mine sweeper
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('chart', 'opened') }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/chartLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Chart
                    </div>
                </div>
                <div className='Desctop_link' onClick={async () => {
                    if (!walletStore.wallet) {
                        await walletStore.connectWallet()
                    }
                    windowStore.setWindowStatus('snake', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/snakeLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Snake
                    </div>
                </div>
                <div className='Desctop_link' onClick={async () => {
                    if (!walletStore.wallet) {
                        await walletStore.connectWallet()
                    }
                    windowStore.setWindowStatus('wack', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/wackLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Wack-a-Knut
                    </div>
                </div>
                <div className='Desctop_link' onClick={async () => {
                    windowStore.setWindowStatus('team', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/teamLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Backers
                    </div>
                </div>

                <div className='Desctop_link' onClick={async () => {
                    if (!walletStore.wallet) {
                        await walletStore.connectWallet()
                    }
                    windowStore.setWindowStatus('chat', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/chatLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Chat
                    </div>
                </div>

                <div className='Desctop_link' onClick={async () => {
                    if (!walletStore.wallet) {
                        await walletStore.connectWallet()
                    }
                    windowStore.setWindowStatus('calendar', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/calendarLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Giveaway Calendar
                    </div>
                </div>


                {/* <div className='Desctop_link' onClick={async () => {
                    windowStore.setWindowStatus('bugreport', 'opened')
                }}>
                    <div className='Desctop_link_img_wrapper'>
                        <img src='/img/links/bugreportLink.png' className='Desctop_link_img' alt='decor' />
                    </div>
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Bug Report
                    </div>
                </div> */}
            </div>
        </div >
    )
})

