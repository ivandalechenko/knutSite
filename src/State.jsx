import React from 'react';
import './scss/State.scss';
import Window from './Window'

const State = (props) => {
    return (
        <Window type="state">
            <div className='State'>
                <img src='/img/bears/base.png' alt='decor' />
            </div>
        </Window>
    )
}

export default State