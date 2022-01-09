import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {UserInfoContext} from './components/context';
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import PictureSegmentation from './components/PictureSegmentation/PictureSegmentation'


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
    <PictureSegmentation />
  )
}

export default App;
