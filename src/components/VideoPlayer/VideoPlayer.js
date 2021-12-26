import React, {useState, useRef} from 'react';

import './VideoPlayer.css';


export default function VideoPlayer() {

    return (
        <div>
            <div className="playerContainer">
                <video controls src="/bilibili-video.mp4">
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
