import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import Home from './components/Home/Home.js';
import About from './components/About/About.js';
import Raffle from './components/Raffle/Raffle.js';
import {UserInfoContext} from './components/context';
import TestPage from './components/Test/test.js';
import VideoPlayer from './components/VideoPlayer/VideoPlayer'


function App() {
    const [userInfo, setUserInfo] = useState({});

    // 这个fetch函数可以用useMero保存起来，或者从外部导入
    function fetchUserInfo() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    userName: 'Tom',
                    loggin: true
                });
            }, 1000);
        });
    }

    useEffect(() => {
        fetchUserInfo().then(userInfo => {
            setUserInfo(userInfo);
        });
    }, []);

    const onLoginChange = () => {
        if (userInfo.loggin) {
            setUserInfo({});
            return;
        }
        fetchUserInfo().then(userInfo => {
            setUserInfo(userInfo);
        });
    };

  return (
    <BrowserRouter>
        <UserInfoContext.Provider value={userInfo}>
            <Link to="/home">首页</Link>
            <br/>
            <Link to="/about">关于</Link>
            <br/>
            <Link to="/raffle">抽奖</Link>
            <br/>
            <Link to="/test">测试页</Link>
            <br/>
            <Link to="/videoPlayer">视频播放器</Link>
            <br/>
            <br/>

            <input type="button" onClick={onLoginChange} value={userInfo.loggin ? '退出' : '登录'}></input>

            <Route path="/home" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/raffle" component={Raffle}/>
            <Route path='/test' component={TestPage}/>
            <Route path='/videoPlayer' component={VideoPlayer}/>
        </UserInfoContext.Provider>
    </BrowserRouter>
  )
}

export default App;
