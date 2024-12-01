import React from 'react';
import './scss/State.scss';
import Window from './Window'
import bearStore from './bearStore'
import { observer } from 'mobx-react-lite';

const State = (props) => {
    return (
        <Window type="state">
            <div className='State'>
                <img src={`/img/bears/${bearStore.currentBear}.svg`} alt='decor' />
                {
                    bearStore.currentBear === 9 && <div className='State_explore'>
                        <div className='State_explore_large'>
                            RIP :(
                        </div>
                        <button onClick={() => {
                            window.open('https://dexscreener.com/solana/8ztb9xdw33yjhfwlxc9u9jox6sbd4x2rzsxm5g1z78e3', '_blank');
                        }}>
                            Explore DEXscreener
                        </button>
                    </div>
                }
            </div>
        </Window>
    )
}

export default observer(State)