import React from 'react';
import './scss/Chart.scss';
import Window from './Window';
export default (props) => {
    return (
        <Window type="chart">
            <div className='Chart'>
                <iframe src="https://dexscreener.com/solana/8ZTB9xdW33YjhFwLXC9u9joX6sBd4x2rzsXm5G1Z78e3?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"></iframe>
            </div>
        </Window>
    )
}