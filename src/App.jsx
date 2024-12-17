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
import Flappy from './Flappy.jsx'
import Minesweeper from './Minesweeper.jsx'
import Chart from './Chart.jsx'
import Snake from './Snake.jsx'
import ChangeWallpaper from './ChangeWallpaper.jsx'
import Bugreport from "./Bugreport.jsx";
import Chat from "./Chat.jsx";
import Quests from "./Quests.jsx";
import Team from "./Team.jsx";



import './scss/App.scss';
import { observer } from 'mobx-react-lite';
import windowStore from './windowStore'
import audioStore from './audioStore'
import bearStore from './bearStore'
import { useEffect } from 'react';
import { useState } from 'react';
import Staking from './Staking.jsx'
import Wack from './Wack.jsx'
import metricStore from './metricStore.js'
import api from './api.js'
import questsStore from './questsStore.js'

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

  useEffect(() => {
    const handleUnload = () => {
      metricStore.sendMetrics()
    };

    window.addEventListener('unload', handleUnload);



    questsStore.initQuests()

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);


  return (
    <div className='App' onClick={() => {
      setfirstClicked(true)
      if (windowStore.getWindowStatus('state') === 'opened') {
        bearStore.incBear()
      }
    }
    }>
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
      {windowStore.getWindowStatus('flappyLeaderboard') === 'opened' && <FlappyLeaderboard type="flappy" />}
      {windowStore.getWindowStatus('snakeLeaderboard') === 'opened' && <FlappyLeaderboard type="snake" />}
      {windowStore.getWindowStatus('wackLeaderboard') === 'opened' && <FlappyLeaderboard type="wack" />}
      {windowStore.getWindowStatus('tttLeaderboard') === 'opened' && <FlappyLeaderboard type="ttt" />}
      {windowStore.getWindowStatus('minesweeperLeaderboard') === 'opened' && <FlappyLeaderboard type="minesweeper" />}
      {windowStore.getWindowStatus('minesweeper') === 'opened' && <Minesweeper />}
      {windowStore.getWindowStatus('chart') === 'opened' && <Chart />}
      {windowStore.getWindowStatus('snake') === 'opened' && <Snake />}
      {windowStore.getWindowStatus('changeWallpaper') === 'opened' && <ChangeWallpaper />}
      {windowStore.getWindowStatus('staking') === 'opened' && <Staking />}
      {windowStore.getWindowStatus('wack') === 'opened' && <Wack />}
      {windowStore.getWindowStatus('bugreport') === 'opened' && <Bugreport />}
      {windowStore.getWindowStatus('chat') === 'opened' && <Chat />}
      {windowStore.getWindowStatus('quests') === 'opened' && <Quests />}
      {windowStore.getWindowStatus('team') === 'opened' && <Team />}
      <TaskPanel />
    </div >
  )
}

export default observer(App)
