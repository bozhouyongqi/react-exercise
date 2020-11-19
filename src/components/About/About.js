import React, { Component } from 'react';
import {UserInfoContext} from '../context';

class Home extends Component {

    static contextType = UserInfoContext;
    
    render() {
        const {userName, loggin} = this.context;
        return (
            <>
                <p>关于页面</p>
                <p>userName: {userName} </p>
                <p>登陆状态: {loggin ? '已登录' : '未登录'}</p>
            </>
        );
    }
}
 
export default Home;