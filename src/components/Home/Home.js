import React, { Component } from 'react';
import Count from '../Hooks/Count';

class Home extends Component {
    state = {
        initCount: 0
    }

    constructor(props) {
        super(props);
    }

    onChangeInitValue = event => {
        let value = 0;
        if (!event.target.value) {
            value = 0;
        }
        value = +event.target.value;
        this.setState({
            initCount: value
        });
    }
    
    render() { 
        return (
            <>
                <p>这是主页</p>
                <input type="text" placeholder="修改计数初始值" onChange={this.onChangeInitValue} value={this.state.initCount}/>
                <Count initValue={this.state.initCount} />
            </>
        )
    }
}
 
export default Home;