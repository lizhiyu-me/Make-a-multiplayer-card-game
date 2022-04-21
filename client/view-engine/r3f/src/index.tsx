import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { isOffLine, ip, port } from './base/src/config/globalConfig';
import GameFacade from './base/src/game/GameFacade';
import { Net } from './base/src/game/net/Net';
import { NetFacade } from './base/src/game/net/NetFacade';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
