import Desctop from './Desctop'
import TaskPanel from './TaskPanel'
import State from './State'
import Roadmap from './Roadmap'
import Whitepaper from './Whitepaper'
import Tokenomics from './Tokenomics'
import Milestones from './Milestones'
import Memes from './Memes'
import CantClose from './CantClose'
import Player from './Player'
import Shutdown from './Shutdown'
import TTT from './TTT'
import Paint from './Paint'
import MemeGen from './MemeGen'
import Airdrop from './Airdrop'
import Thimbles from './Thimbles.jsx'
import FlappyLeaderboard from './FlappyLeaderboard.jsx'
import ThimblesWithMoney from './ThimblesWithMoney.jsx'
import Flappy from './Flappy.jsx'
import Minesweeper from './Minesweeper.jsx'
import Chart from './Chart.jsx'





import './scss/App.scss';
import { observer } from 'mobx-react-lite';
import windowStore from './windowStore'
import audioStore from './audioStore'
import bearStore from './bearStore'
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [firstClicked, setfirstClicked] = useState(false);
  if (localStorage.getItem('thimblesStatus') === undefined || localStorage.getItem('thimblesStatus') === 'undefined') {
    localStorage.removeItem('thimblesStatus')
  }
  useEffect(() => {
    if (firstClicked) {
      audioStore.play = true;
    }
  }, [firstClicked])
  return (
    <div className='App' onClick={() => {
      setfirstClicked(true)
      if (windowStore.getWindowStatus('state') === 'opened') {
        bearStore.incBear()
      }
    }}>
      <Desctop />
      {windowStore.getWindowStatus('whitepaper') === 'opened' && <Whitepaper />}
      {windowStore.getWindowStatus('roadmap') === 'opened' && <Roadmap />}
      {windowStore.getWindowStatus('tokenomics') === 'opened' && <Tokenomics />}
      {windowStore.getWindowStatus('milestones') === 'opened' && <Milestones />}
      {windowStore.getWindowStatus('memes') === 'opened' && <Memes />}
      {windowStore.getWindowStatus('state') === 'opened' && <State />}
      {windowStore.getWindowStatus('player') === 'opened' && <Player />}
      {windowStore.getWindowStatus('shutdown') === 'opened' && <Shutdown />}
      {windowStore.getWindowStatus('cantClose') === 'opened' && <CantClose />}
      {windowStore.getWindowStatus('TTT') === 'opened' && <TTT />}
      {windowStore.getWindowStatus('paint') === 'opened' && <Paint />}
      {windowStore.getWindowStatus('memeGen') === 'opened' && <MemeGen />}
      {windowStore.getWindowStatus('airdrop') === 'opened' && <Airdrop />}
      {windowStore.getWindowStatus('thimbles') === 'opened' && <Thimbles />}
      {windowStore.getWindowStatus('flappy') === 'opened' && <Flappy />}
      {windowStore.getWindowStatus('flappyLeaderboard') === 'opened' && <FlappyLeaderboard />}
      {windowStore.getWindowStatus('minesweeper') === 'opened' && <Minesweeper />}
      {windowStore.getWindowStatus('chart') === 'opened' && <Chart />}


      <TaskPanel />
    </div>
  )
}

export default observer(App)
