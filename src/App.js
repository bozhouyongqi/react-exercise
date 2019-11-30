import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import Home from './components/Home/Home.js';
import About from './components/About/About.js';

function App() {
  return (
    <BrowserRouter>
      <Link to="/home">首页</Link>
      <br/>
      <Link to="/about">关于</Link>



      <Route path="/home" component={Home}/>
      <Route path="/about" component={About}/>
  
    </BrowserRouter>
  )
}

export default App;
