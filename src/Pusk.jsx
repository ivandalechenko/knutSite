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
                    <div className='Pusk_link'>
                        <div className='Pusk_link_del'>
                        </div>
                        Socials
                    </div>
                    <div className='Pusk_hr'></div>
                    <div className='Pusk_link'>
                        <div className='Pusk_link_img'>
                            <img src='/img/media/x.png' alt='decor' />
                        </div>
                        Twitter
                    </div>
                    <div className='Pusk_link'>
                        <div className='Pusk_link_img'>
                            <img src='/img/media/tg.png' alt='decor' />
                        </div>
                        Telegram
                    </div>
                    <div className='Pusk_link'>
                        <div className='Pusk_link_img'>
                            <img src='/img/media/bird.png' alt='decor' />
                        </div>
                        DEXscreener
                    </div>
                    <div className='Pusk_hr'></div>
                    <div className='Pusk_link'>
                        <div className='Pusk_link_img'>
                            <img src='/img/myComp.png' alt='decor' />
                        </div>
                        Shut Down
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pusk