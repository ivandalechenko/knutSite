import React from 'react';
import './scss/Shutdown.scss';
import Window from './Window'
import windowStore from './windowStore'

const Shutdown = (props) => {
    return (
        <Window type='shutdown'>
            <div className='Shutdown'>
                <div className='Shutdown_decor'>

                    <img src='/img/dead.png' alt='decor' />
                </div>
                <div className='Shutdown_header'>
                    Bear is dead
                </div>
                <div className='Shutdown_buttons'>
                    <button onClick={() => {
                        window.open('https://dexscreener.com/solana/8ztb9xdw33yjhfwlxc9u9jox6sbd4x2rzsxm5g1z78e3', '_blank');
                    }}>Explore DEXscreener</button>
                    <button onClick={() => { windowStore.setWindowStatus('shutdown', 'closed') }}>Close</button>
                </div>
            </div>
        </Window>
    )
}

export default Shutdown