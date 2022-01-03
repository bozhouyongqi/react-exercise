import React, {useState, useRef, useEffect} from 'react';
import { getSegmentationArea } from '../../libs/convertSegmentationData';

import './PictureSegmentation.css';

const bodyPix = require('@tensorflow-models/body-pix');

export default function PictureSegmentation() {

  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const videoCanvasRef = useRef(null);

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

      console.log('segmentation ', segmentation);

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
        if(!videoRef.current.paused && !videoRef.current.ended) {
          await segment();
          requestAnimationFrame(generateSegmentation);
        }
      }
      requestAnimationFrame(generateSegmentation);
    });

    return () => {};

  }, [videoRef])


  return (
    <>
      <div>
        人体分割
      </div>
      <img src="/weiya5.jpeg" ref={imageRef}></img>
      <canvas id="canvas" ref={canvasRef}></canvas>

      <video controls src="/bilibili-video2.mp4" id="myVideo" ref={videoRef}> </video>
      <canvas id="videoCanvas" ref={videoCanvasRef}></canvas>
    </>
  );
}
