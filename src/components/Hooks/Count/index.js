
import React from 'react';
import {useState, useEffect} from 'react';


export default function Count(props) {

    // 这里虽然从props中获取初始计数值，但是由于该组件没有添加依赖项，因此再次渲染时，该状态还是首次的值。
    // 当父组件重新渲染了后，子组件肯定避免不了渲染，只不过该子组件中的状态是老的。
    const [count, setCount] = useState(props.initValue);

    useEffect(() => {
        // 如果initValue改变了之后，该组件内部维护的状态也需要改变。这一次setCount之后，由于props中的initValue没有变化，所以本次set更新完，不会再触发一此effect。
        setCount(props.initValue);

    }, [props.initValue]);

    const onCountClick = event => {
        setCount(count + 1);
    };

    return (
        <>
            <div>
                count: {count}
            </div>
            <input type="button" value="计数+1" onClick={onCountClick}>
            </input>
        </>
    );
}
