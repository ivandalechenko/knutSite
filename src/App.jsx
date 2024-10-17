import Desctop from './Desctop'
import TaskPanel from './TaskPanel'
import State from './State'
import './scss/App.scss';
import { observer } from 'mobx-react-lite';
import windowStore from './windowStore'

function App() {
  return (
    <div className='App'>
      <Desctop></Desctop>
      {windowStore.getWindowStatus('state') === 'opened' && <State />}
      <TaskPanel></TaskPanel>
    </div>
  )
}

export default observer(App)
