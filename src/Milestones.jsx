import React from 'react';
import './scss/Milestones.scss';
import Window from './Window'

const Milestones = (props) => {
    return (
        <Window type='milestones'>
            <div className='Milestones'>
                <div className='Milestones_row'>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/window.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            $100.000
                            MCAP
                            Noel DOXXED
                            Tanjim BURNED
                        </div>
                    </div>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/window.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            $250.000 MCAP
                            Artist Reveal #1
                            First official team member reveal
                        </div>
                    </div>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/window.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            $500.000 MCAP
                        </div>
                    </div>
                </div>
                <div className='Milestones_row'>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/planet.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            Backer #1
                            $600.000
                        </div>
                    </div>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/planet.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            Backer #2
                            $700.000
                        </div>
                    </div>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/planet.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            Backer #3
                            $800.000
                        </div>
                    </div>

                    <div className='Milestones_el'>
                        <img src='/img/milestones/planet.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            Backer #5 + KOL #1
                            $1.000.000
                        </div>
                    </div>


                </div>
                <div className='Milestones_row'>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/persons.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            KOL #2
                            $2.000.000
                        </div>
                    </div>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/persons.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            KOL #3
                            $3.000.000
                        </div>
                    </div>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/persons.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            KOL #4
                            $4.000.000
                        </div>
                    </div>
                    <div className='Milestones_el'>
                        <img src='/img/milestones/persons.png' alt='decor' />
                        <div className='Milestones_el_text'>
                            KOL #5
                            $5.000.000
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    )
}

export default Milestones