import React from 'react';
import './scss/FlappyLeaderboard.scss';
import Window from './Window';
import { useState } from 'react';
import { useEffect } from 'react';
import api from './api';

const FlappyLeaderboard = ({ type }) => {
    const [lb, setlb] = useState([]);
    useEffect(() => {
        const init = async () => {
            let res;
            if (type === 'flappy') {
                res = await api.get('/flappy')
            } if (type === 'snake') {
                res = await api.get('/snake')
            } if (type === 'wack') {
                res = await api.get('/wack')
            }

            setlb(res.data)
        }

        init()
    }, [])
    return (
        <Window type={`${type}Leaderboard`} >
            <div className='FlappyLeaderboard'>
                {lb.map((lbel, index) => (
                    <div className='FlappyLeaderboard_element window' key={`lbel-${lbel._id}`}>
                        <div className='FlappyLeaderboard_element_name'>
                            <div className='FlappyLeaderboard_element_decor'>
                                <img src={`/img/flappy/${index < 3 ? `cup${index + 1}` : 'star'}.png`} alt='decor' />
                                <img src='/img/flappy/coin.png' alt='decor' />
                            </div>
                            <div className='FlappyLeaderboard_element_info'>
                                <div className='FlappyLeaderboard_element_info_value'>{lbel.wallet.slice(0, 4)}...{lbel.wallet.slice(-4)}</div>
                            </div>
                        </div>
                        <div className='FlappyLeaderboard_element_right'>
                            {index + 1}{index + 1 === 1 ? 'st' : index + 1 === 2 ? 'nd' : 'th'}
                            <div className='FlappyLeaderboard_element_value_wrapper'>
                                <div className='FlappyLeaderboard_element_value'>
                                    {lbel.score}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Window>
    )
}

export default FlappyLeaderboard