import React, { useState } from 'react';
import './scss/Thimbles.scss';
import Window from './Window';

import ThimblesBid from './ThimblesBid'
import ThimblesLastGames from './ThimblesLastGames'
import ThimblesGame from './ThimblesGame'
import ThimblesGameOffline from './ThimblesGameOffline'
import { observer } from 'mobx-react-lite';

const Thimbles = () => {
    return (
        <Window type='thimbles'>
            <div className='Thimbles'>
                <ThimblesGameOffline />
                <div className='Thimbles_soon window'>
                    <div className='Thimbles_soon_bid'>
                        <input type="text" value={10} />
                        <button>Place bid</button>
                    </div>
                    <div className='Thimbles_soon_text'>
                        Cumming soon...
                    </div>
                </div>
                {/* <ThimblesGame /> */}
                {/* <ThimblesBid /> */}
                {/* <ThimblesLastGames /> */}
            </div>
        </Window>
    );
}

export default observer(Thimbles);