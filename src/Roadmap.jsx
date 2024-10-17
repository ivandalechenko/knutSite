import React from 'react';
import './scss/Roadmap.scss';
import Window from './Window'

const Roadmap = (props) => {
    return (
        <Window type="roadmap">
            <div className='Roadmap'>
                <div className='Roadmap_header'>Roadmap</div>
                <div className='Roadmap_phase'>PHASE 1</div>
                <div className='Roadmap_step'>
                    <img src='/img/success.png' alt='decor' /> Stealth Launch
                </div>
                <div className='Roadmap_step'>
                    <img src='/img/success.png' alt='decor' /> Create Supply Control
                </div>
                <div className='Roadmap_step'>
                    <img src='/img/success.png' alt='decor' /> Onboard Key Players

                </div>
                <div className='Roadmap_step'>
                    <img src='/img/success.png' alt='decor' /> Onboard bad KOL's (PlotTwist)

                </div>
                <div className='Roadmap_step'>
                    <img src='/img/success.png' alt='decor' /> Build Conviction

                </div>
                <div className='Roadmap_step'>
                    <img src='/img/success.png' alt='decor' /> 250 Holders

                </div>
                <div className='Roadmap_phase'>PHASE 2</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />DEX UPDATE</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />MARKET MAKING</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />VOLUME BOT</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />FIRST TIME TRENDING</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />WHITEPAPER RELEASE</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />TOKENOMICS RELEASE</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />PR AND PARTNERSHIPS / SPACES</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />ACTIVATE TIER2 KOL'S</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />KEY PARTNERS START OTC'S</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />FIAT ON / OFF RAMP</div>
                <div className='Roadmap_step'><img src='/img/unsuccess.png' alt='decor' />1000 Holders</div>
            </div>
        </Window>
    )
}

export default Roadmap