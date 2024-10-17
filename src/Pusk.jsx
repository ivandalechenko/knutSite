import React from 'react';
import './scss/Pusk.scss';

const Pusk = (props) => {
    return (
        <div className='Pusk_wrapper free_img'>
            <div className='Pusk window'>
                <div className='Pusk_name'>
                    <div className='Pusk_name_decor free_img'>
                        <div className='Pusk_name_decor_inner'></div>
                    </div>
                    <div className='Pusk_name_text free_img'>
                        $knut
                    </div>
                </div>
                <div className='Pusk_links'>
                    <div className='Pusk_link Pusk_link_header'>
                        <div className='Pusk_link_del'>
                        </div>
                        Socials
                    </div>
                    <div className='Pusk_hr'></div>
                    <a href='https://x.com/knutfanpage?s=21&t=H7dk8e7qY0TSyg4v3SbSFw' target='_blank' className='Pusk_link'>
                        <div className='Pusk_link_img'>
                            <img src='/img/media/x.png' alt='decor' />
                        </div>
                        Twitter
                    </a>
                    <a href='https://t.me/knutonsol' target='_blank' className='Pusk_link'>
                        <div className='Pusk_link_img'>
                            <img src='/img/media/tg.png' alt='decor' />
                        </div>
                        Telegram
                    </a>
                    <a href='https://dexscreener.com/solana/8ztb9xdw33yjhfwlxc9u9jox6sbd4x2rzsxm5g1z78e3' target='_blank' className='Pusk_link'>
                        <div className='Pusk_link_img'>
                            <img src='/img/media/bird.png' alt='decor' />
                        </div>
                        DEXscreener
                    </a>
                    <div className='Pusk_hr'></div>
                    <div className='Pusk_link'>
                        <div className='Pusk_link_img'>
                            <img src='/img/links/shutdownLink.png' alt='decor' />
                        </div>
                        Shut Down
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pusk