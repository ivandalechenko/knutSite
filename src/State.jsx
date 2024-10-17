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
            </div>
        </Window>
    )
}

export default observer(State)