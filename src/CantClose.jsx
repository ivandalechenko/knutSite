import React from 'react';
import './scss/CantClose.scss';
import Window from './Window'

const CantClose = (props) => {
    return (
        <Window type='cantClose'>
            <div className='CantClose'>
                <div className='CantClose_decor'>
                    <img src='/img/cross.png' alt='decor' />
                </div>
                <div className='CantClose_content'>
                    <div className='CantClose_header'>
                        Cannot close the window
                    </div>
                    <div className='CantClose_subheader'>
                        Bear will always be with you
                    </div>
                </div>
            </div>
        </Window>
    )
}

export default CantClose