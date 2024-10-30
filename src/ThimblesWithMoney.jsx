import React, { useState } from 'react';
import './scss/Thimbles.scss';
import Window from './Window';

import ThimblesBid from './ThimblesBid'
import ThimblesLastGames from './ThimblesLastGames'
import ThimblesGame from './ThimblesGame'
import ThimblesGameOffline from './ThimblesGameOffline'
import { observer } from 'mobx-react-lite';

const ThimblesWM = () => {
    return (
        <Window type='thimbleswm'>
            <div className='Thimbles'>
                <ThimblesGame />
                <ThimblesBid />
                <ThimblesLastGames />
            </div>
        </Window>
    );
}

export default observer(ThimblesWM);