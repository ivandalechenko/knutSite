import React, { useState } from 'react';
import './scss/Thimbles.scss';
import Window from './Window';

import ThimblesBid from './ThimblesBid'
import ThimblesGame from './ThimblesGame'
import ThimblesLastGames from './ThimblesLastGames'
import { observer } from 'mobx-react-lite';

const Thimbles = () => {
    return (
        <Window type='thimbles'>
            <div className='Thimbles'>
                <ThimblesGame />
                <ThimblesBid />
                <ThimblesLastGames />
            </div>
        </Window>
    );
}

export default observer(Thimbles);