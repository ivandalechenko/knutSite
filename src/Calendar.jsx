import { useEffect, useState } from 'react';
import './scss/Calendar.scss';
import Window from './Window';
import api from './api';
import walletStore from './walletStore';

// время UTC + 1

const FIRSTDAY = 19
// const TIME_OFFSET_SEC = 60 * 60 * 24
// const TIME_OFFSET_SEC = 60 * 60 * 5
const WINPOS = 96
const TIME_OFFSET_SEC = 0

export default () => {
    const [registered, setregistered] = useState(false);
    const [canClaim, setcanClaim] = useState(false);
    const [timeRemaining, settimeRemaining] = useState(0);
    const [wallets, setwallets] = useState(generateRandomStrings(100, 8));
    const [spinned, setspinned] = useState(false);
    const [winner, setwinner] = useState(false);
    const [winnerName, setwinnerName] = useState('');
    const [winnerNameSent, setwinnerNameSent] = useState(false);


    let timer
    const register = async () => {
        setregistered(true)
        localStorage.setItem('advent-reg', getTodayNumber())
        await api.post('/calendar/reg/', { wallet: walletStore.wallet })
    }
    const claim = async () => {
        const winnerRes = await api.get('/calendar/win/')
        let winner;
        if (winnerRes.data === walletStore.wallet) {
            winner = 'you'
            localStorage.setItem('calendarWinnerUnconnected', true)

        } else {
            winner = winnerRes.data
        }
        setwallets(prev => prev.map((pr, i) => (i === WINPOS ? winner : pr)))
        setspinned(true)

        if (winner === 'you') {
            setTimeout(() => {
                setwinner(true)
            }, 15 * 1000);
        } else {
            localStorage.setItem('advent-claimed', getTodayNumber() - 1)
        }
    }




    useEffect(() => {
        const lastClaimed = +localStorage.getItem('advent-claimed') || 18
        const lastReg = +localStorage.getItem('advent-reg') || 18
        const winner = localStorage.getItem('calendarWinnerUnconnected') || null
        if (winner) {
            setwinner(true)
        }
        if (lastReg - 1 >= lastClaimed && getTodayNumber() >= lastReg + 1) {
            setcanClaim(true)
        }
        if (lastReg === getTodayNumber()) {
            setregistered(true)
        }
        console.log(`Today: ${getTodayNumber()}`);
        console.log(`Last reg: ${lastReg}`);
        console.log(`Last claimed: ${lastClaimed}`);
        updateSecondsUntilMidnightUTCPlus1()
        timer = setInterval(() => {
            updateSecondsUntilMidnightUTCPlus1()
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [])

    const getTodayNumber = () => {
        const now = new Date();
        const utcTimeInSeconds = Math.floor(now.getTime() / 1000) + 60 * 60 + TIME_OFFSET_SEC;
        const date = new Date(utcTimeInSeconds * 1000);
        const dayOfMonth = date.getUTCDate();

        return dayOfMonth
    }

    function updateSecondsUntilMidnightUTCPlus1() {
        const now = new Date(Date.now() + TIME_OFFSET_SEC * 1000);

        // Переводим текущее время в UTC+1
        const utcPlus1 = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours() + 1, // Смещение на +1 час
            now.getUTCMinutes(),
            now.getUTCSeconds(),
            now.getUTCMilliseconds()
        );

        // Определяем следующую полуночь UTC+1
        const nextMidnightUTCPlus1 = new Date(
            utcPlus1.getFullYear(),
            utcPlus1.getMonth(),
            utcPlus1.getDate() + 1, // Следующий день
            0, 0, 0, 0
        );

        // Вычисляем разницу в секундах
        const diffInSeconds = Math.floor((nextMidnightUTCPlus1 - utcPlus1) / 1000);

        const lastClaimed = +localStorage.getItem('advent-claimed') || 18
        const lastReg = +localStorage.getItem('advent-reg') || 18
        if (lastReg - 1 === lastClaimed && getTodayNumber() === lastReg + 1) {
            setcanClaim(true)
        }

        settimeRemaining(diffInSeconds);
    }


    function formatSecondsToHHMMSS(seconds) {
        // Вычисляем часы, минуты и оставшиеся секунды
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');

        return `${hours}:${minutes}:${secs}`;
    }

    const sendWinContacts = async () => {
        await api.post('/calendar/win/', { wallet: walletStore.wallet, tg: winnerName })
        localStorage.removeItem('calendarWinnerUnconnected')
        localStorage.setItem('advent-claimed', getTodayNumber() - 1)
        setwinnerNameSent(true)
    }

    return (
        <Window type='calendar'>
            <div className='Calendar' style={{
                height: canClaim ? "300px" : '400px'
            }}>
                <div className='Calendar_nav'>
                </div>
                <div className='Calendar_content' >
                    {
                        winner
                            ? <div className='Calendar_win'>
                                {
                                    !winnerNameSent ? <div className='Calendar_win_content'>
                                        <div className='Calendar_win_header'>
                                            Congratulations!
                                        </div>
                                        <div className='Calendar_win_subheader'>
                                            You have won, please leave us your username in telegram so that we can contact you
                                        </div>
                                        <div className='Calendar_win_input'>

                                            <input type="text" placeholder='@username' value={winnerName} onChange={(e) => setwinnerName(e.target.value)} />
                                        </div>
                                        <button onClick={sendWinContacts}>
                                            SEND
                                        </button>
                                    </div> : <div className='Calendar_win_content'> <div className='Calendar_win_header'>
                                        Thank you!
                                    </div>
                                        <div className='Calendar_win_subheader'>
                                            We will contact you shortly. Have a nice day :)
                                        </div>
                                    </div>
                                }
                                <div className='Calendar_spin_bear free_img'>
                                    <img src={`/img/flappy/bearWings.png`} alt="" />
                                </div>
                                <div className='Calendar_spin_gift free_img'>
                                    <img src={`/img/calendar/gift.png`} alt="" />
                                </div>
                            </div>
                            : canClaim ? <div className='Calendar_spin'>
                                <div className='Calendar_spinner_wrapper'>
                                    <div className='Calendar_spinner'>
                                        {wallets.map((wallet, index) => {
                                            return <div className={`Calendar_spinner_element ${spinned && 'spin'}`} key={`calendar-el-${index}`}>
                                                <div className='Calendar_spinner_element_text'>
                                                    {
                                                        wallet === 'you' ? `YOU WIN!!!` : `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
                                                    }
                                                </div>
                                                <div className='Calendar_spinner_element_img free_img'>
                                                    <img src={`/img/calendar/${index === WINPOS ? 'winner' : 'member'}.png`} alt="" />
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className='Calendar_spin_arrow free_img'>
                                    <img src={`/img/calendar/arrow.png`} alt="" />
                                </div>
                                <div className='Calendar_spin_bear free_img'>
                                    <img src={`/img/flappy/bearWings.png`} alt="" />
                                </div>
                                <div className='Calendar_spin_gift free_img'>
                                    <img src={`/img/calendar/gift.png`} alt="" />
                                </div>
                                <div className='Calendar_spin_btn_wrapper'>
                                    <button className='Calendar_spin_btn' onClick={claim}>
                                        SPIN
                                    </button>
                                </div>
                            </div> : <>
                                <div className='Calendar_pic free_img'>
                                    <video autoPlay muted loop playsInline>
                                        <source src={`/img/calendar/base.mp4`} type="video/mp4" />
                                    </video>
                                </div>
                                <div className='Calendar_lock free_img' >
                                    <img src={`/img/calendar/1${registered ? "opened" : ''}.png`} onClick={register} alt="" />
                                </div>
                                {
                                    registered && <div className='Calendar_success free_img'>
                                        <div className='Calendar_success_inner'>
                                            Congratulations!
                                            <div>
                                                You have successfully registered for today's draw.
                                            </div>
                                            <button>
                                                {formatSecondsToHHMMSS(timeRemaining)}
                                            </button>
                                        </div>
                                    </div>
                                }
                            </>
                    }

                </div>
            </div>
        </Window >
    )
}


function generateRandomStrings(count, length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const result = [];

    for (let i = 0; i < count; i++) {
        let str = '';
        for (let j = 0; j < length; j++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        result.push(str);
    }
    return result;
}