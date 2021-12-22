import React, {useState, useRef} from 'react';

import './VideoPlayer.css';


export default function Raffle() {



    return (
        <div>
            <div className="playerContainer">
                <video controls src="https://lark-video.oss-cn-hangzhou.aliyuncs.com/outputs/prod/lark/2021/4256566/mp4/1640183761325-98d50f74-876a-4827-a859-93b0d84e9cde.mp4?OSSAccessKeyId=LTAI4GGhPJmQ4HWCmhDAn4F5&Expires=1640190968&Signature=kp2s5FYFlnnkwHb1Ca6mHN1muOM%3D">
                </video>

                <div className="danmuContainer danmuMask">
                    <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
                </div>
            </div>

            <div className="mediaContainer">
                <img src="/flower2.jpeg" className="flower"></img>

                <div className="mediaDanmu testMaskImage">
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                    <div>this is a danmu this is a danmu this is a danmu this is a danmu</div>
                </div>

            </div>
        </div>
    );
}
