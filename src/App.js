import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import Home from './components/Home/Home.js';
import About from './components/About/About.js';
import Raffle from './components/Raffle/Raffle.js';

function App() {
  return (
    <BrowserRouter>
      <Link to="/home">首页</Link>
      <br/>
      <Link to="/about">关于</Link>
       <br/>
      <Link to="/raffle">抽奖</Link>



      <Route path="/home" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/raffle" component={Raffle}/>
  
    </BrowserRouter>
  )
}

export default App;
