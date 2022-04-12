import { createRoot } from 'react-dom/client';
import App from './App';
import { ip, isOffLine, port } from './base/src/config/globalConfig';
import GameFacade from './base/src/game/GameFacade';
import { Net } from './base/src/game/net/Net';
import { NetFacade } from './base/src/game/net/NetFacade';
import './index.css';

if (isOffLine) {
  console.log('offline');
  let facade = new GameFacade();
  createRoot(document.getElementById('root')).render(<App gameFacade={facade} />);
} else {
  new NetFacade();
  Net.init(ip, port, () => {
    const root = createRoot(document.getElementById('root')!)
    let _gameFacade = new GameFacade();
    root.render(
      <App gameFacade={_gameFacade} />
    );
  })
}