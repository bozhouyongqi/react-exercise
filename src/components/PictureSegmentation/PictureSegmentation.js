import React, {useState, useRef, useEffect} from 'react';
import { getSegmentationArea } from '../../libs/convertSegmentationData';

import './PictureSegmentation.css';

const bodyPix = require('@tensorflow-models/body-pix');

export default function PictureSegmentation() {

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function segment() {
      console.log('use effect', bodyPix)
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
      console.log('imageRef.current ', imageRef.current)
      const segmentation = await net.segmentPerson(imageRef.current)
        .catch((error) => {
          console.log('error', error)
        })
      console.log(segmentation);

      console.log(getSegmentationArea(segmentation))

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


  return (
    <>
      <div>
        人体分割
      </div>
      <img src="/fbb2.jpeg" ref={imageRef}></img>
      <canvas id="canvas" ref={canvasRef}></canvas>
    </>
  );
}
