import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from './api';

const ThimblesLastGames = (props) => {
    const [games, setgames] = useState([]);
    let interval;
    useEffect(() => {
        getGames()
        interval = setInterval(() => {
            getGames()
        }, 5 * 1000);
        return () => {
            clearInterval(interval)
        }
    }, [])

    const getGames = async () => {
        const res = await api.get(`/game/last`)
        const data = res.data
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setgames(res.data)
    }


    return (
        <div className='Thimbles_lastGames window'>
            <div className='Thimbles_lastGames_header'>
                Last games
            </div>
            <div className='Thimbles_lastGames_list'>
                <div className='Thimbles_lastGames_element Thimbles_lastGames_element_header'>
                    <div className='Thimbles_lastGames_element_date'>Date</div>
                    <div className='Thimbles_lastGames_element_bid'>Bid $KNUT</div>
                    <div className='Thimbles_lastGames_element_sign'>Bid Sign.</div>
                    <div className='Thimbles_lastGames_element_sign'>Win Sign.</div>
                    <div className='Thimbles_lastGames_element_status'>Status</div>
                </div>
                {
                    games.map((game) => {
                        return <div className='Thimbles_lastGames_element' key={`${game._id}`}>
                            <div className='Thimbles_lastGames_element_date'>{formatDate(game.date)}</div>
                            <div className='Thimbles_lastGames_element_bid'>{game.bid / 1e6}</div>
                            <a href={`https://solscan.io/tx/${game.bidSignature}`} target='_blank' className='Thimbles_lastGames_element_sign'>{game.bidSignature
                            }</a>
                            <a href={`https://solscan.io/tx/${game.winSignature}`} target='_blank' className='Thimbles_lastGames_element_sign'>{game.winSignature}</a>
                            <div className='Thimbles_lastGames_element_status'>{game.status}</div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ThimblesLastGames


function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} sec. ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} min. ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
}
