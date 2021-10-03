import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const InitialSettings = {
  CARD_COUNT: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      cardCount = {InitialSettings.CARD_COUNT}
    />
  </React.StrictMode>,
  document.getElementById('root'));
