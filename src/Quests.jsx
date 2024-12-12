import { useEffect, useState } from 'react';
import './scss/Quests.scss';
import Window from './Window';
import api from './api';
import questsStore from './questsStore';
import userStore from './userStore';
export default () => {
    const [openedTab, setopenedTab] = useState('Socials');


    useEffect(() => {
        userStore.getMe()
    }, [])

    const claim = (art) => {
        console.log(art);

    }

    return (
        <Window type="quests">
            <div className='Quests window_inner'>
                <div className='Quests_balance'>
                    Balance <span>1234 $knut</span>
                </div>
                <div className='Quests_tabs'>
                    {
                        ['General', 'Socials', 'Daily'].map((tab) => {
                            return <div key={`tab-${tab}`} className={`Quests_tab ${tab === openedTab && 'Quests_tab_opened'}`} onClick={() => { setopenedTab(tab) }}>
                                {tab}
                            </div>
                        })
                    }
                </div>

                {
                    openedTab === 'General' && <div className='Quests_general'>
                        {questsStore.quests.map((quest) => {
                            const best = +localStorage.getItem(`${quest.type}Best`) || 0
                            let percentOfComplete = best / quest.reqScore * 100;

                            if (quest.type === 'minesweeper') {

                                percentOfComplete = best - quest.reqScore > 0 ? quest.reqScore - best === quest.reqScore ? 0 : 50 : 100;
                            }


                            if (userStore.me.quests.includes(quest.art)) {
                                return
                            }
                            if (quest.category === 'General') {
                                return <div className='Quests_general_element' key={quest.art}>
                                    <div className='Quests_general_name'>
                                        <img src={`/img/links/${quest.type}Link.png`} alt="" />
                                        <div className='Quests_general_name_text'>
                                            {
                                                quest.lname
                                            }
                                        </div>
                                    </div>
                                    <div className='Quests_general_content'>
                                        <div className='Quests_general_content_header'>
                                            <div className='Quests_general_content_req'>
                                                {quest.reqText}
                                            </div>
                                            <div className='Quests_general_content_btn' onClick={() => { percentOfComplete >= 100 && claim(quest.art) }}>
                                                <span>{percentOfComplete >= 100 ? 'Claim' : 'In progress'}</span> (+{quest.price} $knut)
                                            </div>
                                        </div>
                                        <div className='Quests_general_content_status'>
                                            <div className='Quests_general_content_status_inner' style={{
                                                width: `${percentOfComplete + 1}%`
                                            }}>
                                            </div>
                                            <div className={`free_img Quests_general_content_status_value`}>
                                                {Math.min(percentOfComplete, 100).toFixed(1)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        })}
                    </div>
                }
                {
                    openedTab === 'Socials' && <div className='Quests_'></div>
                }

            </div>
        </Window>
    )
}