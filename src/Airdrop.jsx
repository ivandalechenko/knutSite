import React from 'react';
import './scss/Airdrop.scss';
import Window from './Window'
import { useState } from 'react';

const Airdrop = (props) => {
    const [copied, setcopied] = useState(false);
    let copDelTO
    const copy = () => {
        navigator.clipboard.writeText('7txNyx3A3Gn1fCZmqpEoEhABkGGdn2g1bisPg8HZi8hG').then(() => {
            setcopied(true)
            clearTimeout(copDelTO)
            copDelTO = setTimeout(() => {
                setcopied(false)
            }, 5000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
        });

    }
    return (
        <Window type='airdrop'>
            <div className='Airdrop'>
                <div className='Airdrop_header'>
                    Airdrop
                </div>
                <div className='Airdrop_subheader'>
                    Transfer the tokens to the address, and you are guaranteed to receive additional tokens with the sent sum until
                </div>
                <div className='Airdrop_dateAndCopy'>
                    <button>
                        25 October
                    </button>
                    {copied && <div className='Airdrop_copy'>
                        <img src='/img/success.png' alt='decor' />Address successfully copied!</div>}
                </div>
                <div className='Airdrop_content window' onClick={copy}>
                    <div className='Airdrop_content_header'>
                        <div className='Airdrop_content_header_net'>Solana</div>
                        <div className='Airdrop_content_header_address'>
                            7txNyx3A3Gn1fCZmqpEoEhABkGGdn2g1bisPg8HZi8hG
                            <img src='/img/copy.png' alt='decor' />
                        </div>
                    </div>
                    <div className='Airdrop_content_decor'>
                        <img src='/img/airdrop.png' alt='decor' />
                    </div>
                </div>
            </div>
        </Window>
    )
}

export default Airdrop