import React, {useState, useRef, useEffect} from 'react';
import { getSegmentationArea } from '../../libs/convertSegmentationData';
import {select, selectAll} from 'd3'

import './PictureSegmentation.css';

const bodyPix = require('@tensorflow-models/body-pix');

export default function PictureSegmentation() {

  const [svgElemUrl, setSvgElemUrl] = useState('');

  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const videoCanvasRef = useRef(null);

  const danmuContainerRef = useRef(null);

  const svgRef = useRef(null);

  useEffect(() => {
    async function segment() {
      const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2
      })
      .catch(error => {
        console.log('load engine error', error)
      })
      /**
       * One of (see documentation below):
       *   - net.segmentPerson
       *   - net.segmentPersonParts
       *   - net.segmentMultiPerson
       *   - net.segmentMultiPersonParts
       * See documentation below for details on each method.
        */
      const start = new Date().getTime();
      const segmentation = await net.segmentPerson(imageRef.current)
        .catch((error) => {
          console.log('error', error)
        })
      // 处理分割花费约2秒
      console.log(segmentation, 'cost ', new Date().getTime() - start);

      const coloredPartImage = bodyPix.toMask(segmentation);
      const opacity = 0.7;
      const flipHorizontal = false;
      const maskBlurAmount = 0;
      const canvas = canvasRef.current;
      // Draw the mask image on top of the original image onto a canvas.
      // The colored part image will be drawn semi-transparent, with an opacity of
      // 0.7, allowing for the original image to be visible under.
      bodyPix.drawMask(
          canvas, imageRef.current, coloredPartImage, opacity, maskBlurAmount,
          flipHorizontal);
    }
    segment();

    return () => {};

  }, [imageRef])

  useEffect(() => {
        
    let net

    async function segment() {
      /**
       * One of (see documentation below):
       *   - net.segmentPerson
       *   - net.segmentPersonParts
       *   - net.segmentMultiPerson
       *   - net.segmentMultiPersonParts
       * See documentation below for details on each method.
        */
      const segmentation = await net.segmentPerson(videoRef.current)
        .catch((error) => {
          console.log('error', error)
        })
      if (!segmentation) {
        return;
      }

      const bodyCoordinate = getSegmentationArea(segmentation);

      if (bodyCoordinate) {
        const svgData = {
          width: segmentation.width,
          height: segmentation.height,
          bodyCoordinate
        }
        drawPath(svgData);

        const svg = svgRef.current
        if (!svg) {
          return;
        }
        const s = new XMLSerializer().serializeToString(svg);
        const ImgBase64 = `data:image/svg+xml;base64,${window.btoa(s)}`;

        const danmuElem = danmuContainerRef.current;
        danmuElem.style.maskImage = `url(${ImgBase64})`;
        danmuElem.style.WebkitMaskImage = `url(${ImgBase64})`;
      }

      const coloredPartImage = bodyPix.toMask(segmentation);
      const opacity = 0.7;
      const flipHorizontal = false;
      const maskBlurAmount = 0;
      // // Draw the mask image on top of the original image onto a canvas.
      // // The colored part image will be drawn semi-transparent, with an opacity of
      // // 0.7, allowing for the original image to be visible under.
      bodyPix.drawMask(
        videoCanvasRef.current, videoRef.current, coloredPartImage, opacity, maskBlurAmount,
        flipHorizontal);

    }
    async function loadModel() {
      net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.5,
        quantBytes: 2
      })
      .catch(error => {
        console.log('load engine error', error)
      })
    }
    
    loadModel();

    videoRef.current.addEventListener('play', () => {

      async function generateSegmentation() {
        if (!videoRef || !videoRef.current) {
          return;
        }
        if(!videoRef.current.paused && !videoRef.current.ended) {
          await segment();
          requestAnimationFrame(generateSegmentation);
        }
      }
      requestAnimationFrame(generateSegmentation);
    });

    return () => {};

  }, [])

  const drawPath = (pathParam) => {
    const { width, height, bodyCoordinate } = pathParam;
    const svg = select('#mySvg');
    svg.attr('width', width)
      .attr('height', height);
    const bindData = [bodyCoordinate];
    const pathElemUpdate = svg.selectAll('path')
      .data(bindData);
    const enterPath = pathElemUpdate.enter();
    const exitPath = pathElemUpdate.exit();
    exitPath.remove();

    const startPoint = '0 0';
    const points = [];
    points[0] = `${width} 0`
    points[1] = `${width} ${height}`
    points[2] = `0 ${height}`

    const drawPathCallback = function (bodyCoordinate) {
      const {top, left, bottom, right} = bodyCoordinate;
      points[3] = `0 ${bottom}`;
      points[4] = `${left} ${bottom}`
      points[5] = `${right} ${bottom}`
      points[6] = `${right} ${top}`
      points[7] = `${left} ${top}`
      points[8] = points[4]
      points[9] = points[3]
    
      let path = points.join(' L ');
      path = `M${startPoint} ${path} Z`;
      return path
    }
  
    pathElemUpdate.attr('d', drawPathCallback)

    enterPath
    .append('path')
    .attr('d', drawPathCallback)
  }

  return (
    <>
      <div>
        人体分割
      </div>
      <img src="/weiya5.jpeg" ref={imageRef}></img>
      <canvas id="canvas" ref={canvasRef}></canvas>

      <div className="videoContainer">
        <video controls src="/bilibili-video2.mp4" id="myVideo" ref={videoRef}> </video>

        <div className="danmuContainer" ref={danmuContainerRef}>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
          <div className="danmuContent">this is a danmu this is a danmu this is a danmu this is a danmu this is a danmu</div>
        </div>
      </div>
      <canvas id="videoCanvas" ref={videoCanvasRef}></canvas>

      <svg width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" id="mySvg" ref={svgRef}>
      </svg>
    </>
  );
}
