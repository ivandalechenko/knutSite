import React from 'react';
import './scss/Tokenomics.scss';
import Window from './Window'

const Tokenomics = (props) => {
    return (
        <Window type={'tokenomics'}>
            <div className='Tokenomics'>
                <div className='Tokenomics_header'>
                    <img src='/img/links/tokenomicsLink.png' alt='decor' />
                    Tokenomisc
                </div>
                <div className='Tokenomics_block'>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name'>DEV WALLET DOXXED</div>
                        <div className='Tokenomics_el_perc'>:4%</div>
                    </div>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name'>DEV WALLET</div>
                        <div className='Tokenomics_el_perc'>:8.64%</div>
                    </div>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name'>ADDITIONAL TEAM</div>
                        <div className='Tokenomics_el_perc'>:15%</div>
                    </div>
                </div>
                <div className='Tokenomics_block'>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name'>PARTNER #1</div>
                        <div className='Tokenomics_el_perc'>:4%</div>
                    </div>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name'>PARTNER #2</div>
                        <div className='Tokenomics_el_perc'>:1.55%</div>
                    </div>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name'>PARTNER #3</div>
                        <div className='Tokenomics_el_perc'>:3.38%</div>
                    </div>
                </div>
                <div className='Tokenomics_block'>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name'>BACKER #1</div>
                        <div className='Tokenomics_el_perc'>:3%</div>
                    </div>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name'>BACKER #2</div>
                        <div className='Tokenomics_el_perc'>:1,75% 1,75% 1,5%</div>
                    </div>
                    <div className='Tokenomics_el'>
                        <div className='Tokenomics_el_name'>TOTAL</div>
                        <div className='Tokenomics_el_perc'>:5%</div>
                    </div>
                </div>
            </div>
        </Window>
    )
}

export default Tokenomics