import React from 'react';
import './scss/Whitepaper.scss';
import Window from './Window'

const Whitepaper = (props) => {
    return (
        <Window type='whitepaper'>
            <div className='Whitepaper'>
                <div className='Whitepaper_header'>
                    Whitepaper: PERFECT
                </div>
                <div className='Whitepaper_subheader'>
                    Knut Stealth Launch
                    <br />
                    Overview
                </div>
                <div className='Whitepaper_p'>
                    The Knut project successfully launched on September 26 at midnight, marking the beginning of an exciting journey for our community and backers. The launch was designed to provide a seamless experience for our initial supporters and to set the stage for future growth and engagement.
                </div>
                <div className='Whitepaper_subheader'>
                    Initial Backers
                </div>
                <div className='Whitepaper_p'>
                    Total Initial Backers: 4 <br />
                    Launch Timeline <br />
                    Launch Date: September 26, 2023, at 12:00 AM CEST <br />
                    Over-The-Counter (OTC) OPEN MARKET Sales Schedule <br />
                    First OTC: September 27, 12:00 AM CEST <br />
                    Second OTC: September 29, 12:45 PM CEST <br />
                    Third OTC: September 29, 1:30 PM CEST <br />
                    Fourth OTC: September 29, 4:30 PM CEST <br />
                    Fifth OTC: September 30, 11:00 AM CEST <br />
                    Sixth OTC: September 30, 12:00 AM CEST <br />
                    Seventh OTC: October 4, 6:30 PM CEST <br />
                    Eighth OTC: October 4, 11:30 PM CEST <br />
                    Ninth OTC: October 5, 2:15 AM CEST <br />
                    Tenth OTC: October 5, 4:30 PM CEST <br />
                    Eleventh OTC: October 6, 11:30 PM CEST <br />
                    Twelfth OTC: October 8, 5:00 AM CEST <br />
                    Thirteenth OTC: October 10, 10:30 AM CEST <br /><br />
                    Total open-market OTCs - 13<br /><br />

                    Additional private OTC's : 10<br /><br />

                    OTC's ready for execution : 12 <br /><br />

                    Full whitepaper will be provided during phase 2
                </div>
            </div>
        </Window>
    )
}

export default Whitepaper