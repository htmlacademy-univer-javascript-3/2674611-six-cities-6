import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {testOffers} from './mocks/offer.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={312} offers={testOffers}/>
  </React.StrictMode>
);
