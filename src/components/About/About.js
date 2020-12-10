import React, { Component, useState, useEffect } from 'react';
import {UserInfoContext} from '../context';

function Count() {
    const [count, setCount] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const id = setInterval(() => {
            setCount(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearImmediate(id);
        }
    }, []);

    return count;
}

class Home extends Component {

    static contextType = UserInfoContext;
    
    render() {
        const {userName, loggin} = this.context;
        return (
            <>
                <p>关于页面</p>
                <p>userName: {userName} </p>
                <p>登陆状态: {loggin ? '已登录' : '未登录'}</p>

                <Count />
            </>
        );
    }
}
 
export default Home;