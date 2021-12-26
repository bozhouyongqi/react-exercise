import React, {useState, useRef, useEffect} from 'react';

import './PictureSegmentation.css';

const bodyPix = require('@tensorflow-models/body-pix');

export default function PictureSegmentation() {

  const imageRef = useRef(null);

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
    }
    segment();

    return () => {};

  }, [imageRef])


  return (
    <>
      <div>
        人体分割
      </div>
      <img src="/fbb2.jpeg" width="300px" ref={imageRef}></img>
    </>
  );
}
