import React from 'react';
import './scss/Desctop.scss';
import windowStore from './windowStore'
import { observer } from 'mobx-react-lite';

const Desctop = (props) => {
    return (
        <div className='Desctop'>
            <div className='Desctop_links'>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('state', 'opened') }}>
                    <img src='/img/links/stateLink.png' className='Desctop_link_img' alt='decor' />
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        $knut State
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('roadmap', 'opened') }}>
                    <img src='/img/links/roadmapLink.png' className='Desctop_link_img' alt='decor' />
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Roadmap
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('whitepaper', 'opened') }}>
                    <img src='/img/links/whitepaperLink.png' className='Desctop_link_img' alt='decor' />
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Whitepaper
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('tokenomics', 'opened') }}>
                    <img src='/img/links/tokenomicsLink.png' className='Desctop_link_img' alt='decor' />
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Tokenomics
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('milestones', 'opened') }}>
                    <img src='/img/links/milestonesLink.png' className='Desctop_link_img' alt='decor' />
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Milestones
                    </div>
                </div>
                <div className='Desctop_link' onClick={() => { windowStore.setWindowStatus('memes', 'opened') }}>
                    <img src='/img/links/memesLink.png' className='Desctop_link_img' alt='decor' />
                    <div className='Desctop_link_arrow free_img'>
                        <img src='/img/links/arrow.png' alt='decor' />
                    </div>
                    <div className='Desctop_link_text'>
                        Memes
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Desctop)