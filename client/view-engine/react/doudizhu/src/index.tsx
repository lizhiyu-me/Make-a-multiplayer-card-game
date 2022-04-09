import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ip, port } from './base/src/config/globalConfig';
import { Net } from './base/src/game/net/Net';
import { NetFacade } from './base/src/game/net/NetFacade';
import GameFacade from './base/src/game/GameFacade';

new NetFacade();
Net.init(ip, port, () => {
  const root = createRoot(document.getElementById('root')!)
  new GameFacade();
  root.render(
    // <React.StrictMode>
      <App handListSerials={[1, 2, 3, 4, 5, 6]} />
    // </React.StrictMode>
  );
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})

