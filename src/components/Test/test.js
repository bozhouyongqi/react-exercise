import React, {Component, PureComponent, useState} from 'react';

function Count(props) {
    const [state, setstate] = useState({count: 0});
    const onClick = () => {
        setstate(state);
    }
    console.log('render');
    return (
        <>
            <span>{state.count}</span>
            <button onClick={onClick}>click</button>
        </>
    )
}

export default class TestPage extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        console.log('render');
        return (
            <Count />
        );
    }
}
