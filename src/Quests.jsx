import { useEffect, useState } from 'react';
import './scss/Quests.scss';
import Window from './Window';
import questsStore from './questsStore';
import userStore from './userStore';
import { observer } from 'mobx-react-lite';
export default observer(() => {
    const [openedTab, setopenedTab] = useState('Socials');
    const [inProgress, setinProgress] = useState([]);
    const [claimed, setclaimed] = useState([]);

    useEffect(() => {
        userStore.getMe()
    }, [])

    const claim = (art) => {
        setclaimed(prev => [...prev, art]);
        questsStore.claimReward(art)
    }

    const startQuest = (art) => {
        questsStore.completeQuest(art)
        setinProgress(prev => [...prev, art]);
        setTimeout(() => {
            setinProgress(prev => prev.filter(item => item !== art));
        }, 30 * 1000);
    }



    return (
        <Window type="quests">

            {/* <div className='Quests window_inner' key={`please_rerender_${userStore.quests.length}`}> */}
            <div className='Quests window_inner' key={`please_rerender_${claimed.length}`}>
                <div className='Quests_balance'>
                    Balance <span>{userStore.me.balance} $knut</span>
                </div>
                <div className='Quests_tabs'>
                    {
                        ['General', 'Socials'].map((tab) => {
                            return <div key={`tab-${tab}`} className={`Quests_tab ${tab === openedTab && 'Quests_tab_opened'}`} onClick={() => { setopenedTab(tab) }}>
                                {tab}
                            </div>
                        })
                    }
                </div>

                {
                    openedTab === 'General' && <div className='Quests_general'>
                        {questsStore.quests.map((quest) => {

                            if (userStore.me.quests.includes(quest.art)) {
                                return
                            }
                            if (claimed.includes(quest.art)) {
                                return
                            }
                            if (quest.category === 'General') {

                                const best = +localStorage.getItem(`${quest.type}Best`) || 0
                                let percentOfComplete = best / quest.reqScore * 100;

                                if (quest.type === 'minesweeper') {

                                    percentOfComplete = best - quest.reqScore > 0 ? quest.reqScore - best === quest.reqScore ? 0 : 50 : 100;
                                }

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
                    openedTab === 'Socials' && <div className='Quests_socials_wrapper'>
                        <div className='Quests_socials'>
                            {questsStore.quests.map((quest) => {
                                if (userStore.me.quests.includes(quest.art)) {
                                    return
                                }
                                if (claimed.includes(quest.art)) {
                                    return
                                }
                                if (quest.category === 'Socials') {
                                    console.log(quest);

                                    const completed = localStorage.getItem(`quest_${quest.art}Completed`) || false;
                                    const link = quest.link || ''


                                    return <div className='Quests_socials_element' key={quest.art}>
                                        <div className='Quests_socials_element_info'>
                                            <div className='Quests_socials_element_name'>
                                                {quest.name}
                                            </div>
                                            <div className='Quests_socials_element_price'>
                                                (+{quest.price} $knut)
                                            </div>
                                        </div>
                                        <a href={`${link}`} target='_blank' onClick={(e) => {
                                            if (completed) {
                                                e.preventDefault()
                                                claim(quest.art)
                                            }
                                            link ? startQuest(quest.art) : e.preventDefault()
                                        }} className={`Quests_socials_element_btn ${!link && 'Quests_socials_element_btn_nolink'}`}>
                                            {
                                                link
                                                    ? inProgress.includes(quest.art)
                                                        ? 'Checking...'
                                                        : completed
                                                            ? "Claim"
                                                            : 'Start'
                                                    : completed
                                                        ? "Claim"
                                                        : 'In progress'
                                            }
                                        </a>
                                    </div>
                                }
                            })}
                        </div>
                    </div>
                }

            </div>
        </Window>
    )
})