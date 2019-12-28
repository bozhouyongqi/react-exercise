import React, {useState, useRef} from 'react';

import './Raffle.css';

const pool = [
    { name: '杨丽', selected: false, prize: '' },
    { name: '王永奇', selected: false, prize: '' },
    { name: '杨建', selected: false, prize: '' },
    { name: '黄玲玲', selected: false, prize: '' },
    { name: '杨睿轩', selected: false, prize: '' },
    { name: '丈母娘', selected: false, prize: '' },
    { name: '老丈人', selected: false, prize: '' },
    { name: '妈', selected: false, prize: '' },
    { name: '爸', selected: false, prize: '' },
    { name: '秋雨', selected: false, prize: '' },
    { name: '夏雨', selected: false, prize: '' },
    { name: '子祥', selected: false, prize: '' },
    { name: '泡泡', selected: false, prize: '' },
    { name: 'cc', selected: false, prize: '' },
    { name: '丑丑', selected: false, prize: '' }
]


export default function Raffle() {

    const [selectedNum, setSelectedNum] = useState(0);
    const [prizeName, setPrizeName] = useState('');
    const [raffleState, setRaffleState] = useState(true);
    const [selectedPerson, setSelectPerson] = useState([]);
    const timmerRef = useRef(null);

    const handleSelectedNumChange = event => {
        console.log('handleSelectedNumChange')
        setSelectedNum(event.target.value);
    };

    const handlePrizeNameChange = event => {
        setPrizeName(event.target.value);
    }

    const startRaffle = () => {

        if (timmerRef.current) {
            return;
        }
        const newPool = pool.filter(item => !item.selected);
        const newPoolLength = newPool.length;

        if (newPoolLength === 0) {
            alert('全部都已中奖，没有人员可抽！！！');
            return;
        }

        if (selectedNum === 0) {
            alert('设置抽奖人数需大于0！！！');
            return;
        }

        if (selectedNum >= newPoolLength) {
            console.log('剩余人数不足，全部抽中： ', newPool);
            setSelectPerson(newPool);
            newPool.map(item => {
                item.selected = true;
            })
            return;
        }

        // 循环从剩余pool中循环抽取selectedNum名同学
        let outerIdx = 0, step = selectedNum;
        let innerIdx = 0;
        let array = [];

        timmerRef.current = setInterval(() => {
            console.log('interval')
            array = [];
            for (innerIdx = 0; innerIdx < step; innerIdx++) {
                array.push(newPool[outerIdx]);
                outerIdx = (++outerIdx) % newPool.length;
            }
            setSelectPerson(array);
        }, 50);
    };

    const endRaffle = () => {
        if (timmerRef.current) {
            clearInterval(timmerRef.current);
            timmerRef.current = null;
            // 设置状态
            selectedPerson.map(item => {
                item.selected = true;
            });
        }
    }


    return (
        <div className="raffle-page">
            幸运抽奖

            <div className="scroll-area">
                {
                    selectedPerson.map((item, index) => <div className="raffle-person" key={index}>{item.name}</div>)
                }

            </div>

            <label>
                请设置抽奖人数：
                <input type="number" value={selectedNum} onChange={handleSelectedNumChange} />
            </label>

            <label>
                请设置奖项：
                <input type="text" value={prizeName} onChange={handlePrizeNameChange} placeholder="奖项名，例如：一等奖，二等奖" />
            </label>
        
            <input type="button" value="开始抽奖" onClick={startRaffle}/>
            <input type="button" value="停止抽奖" onClick={endRaffle}/>
        </div>
    );
}