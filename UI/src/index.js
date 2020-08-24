import '../public/scss/main.scss';

import App from './App.js'
import React from 'react';
import ReactDOM from 'react-dom';

import Game from '../../Game'
document.Game = Game;

const root = document.createElement("div");
root.id = "root"
document.body.append(root);

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

console.log('ok');