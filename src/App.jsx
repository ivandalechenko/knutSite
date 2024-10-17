import Desctop from './Desctop'
import TaskPanel from './TaskPanel'
import State from './State'
import Roadmap from './Roadmap'
import Whitepaper from './Whitepaper'
import Tokenomics from './Tokenomics'
import Milestones from './Milestones'

import './scss/App.scss';
import { observer } from 'mobx-react-lite';
import windowStore from './windowStore'
import bearStore from './bearStore'

function App() {
  return (
    <div className='App' onClick={() => {
      if (windowStore.getWindowStatus('state') === 'opened') {
        console.log('meow');
        bearStore.incBear()
      }
    }}>
      <Desctop />
      {windowStore.getWindowStatus('state') === 'opened' && <State />}
      {windowStore.getWindowStatus('whitepaper') === 'opened' && <Whitepaper />}
      {windowStore.getWindowStatus('roadmap') === 'opened' && <Roadmap />}
      {windowStore.getWindowStatus('tokenomics') === 'opened' && <Tokenomics />}
      {windowStore.getWindowStatus('milestones') === 'opened' && <Milestones />}
      <TaskPanel />
    </div>
  )
}

export default observer(App)
