//import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/scss/main.scss';
import '../public/css/main.css';
import App from './App.js'
import React from 'react';
import ReactDOM from 'react-dom';

import Game from '../../Game/src/index.js'
document.Game = Game;

const root = document.createElement("div");
root.id = "root"
document.body.append(root);

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

console.log('ok');