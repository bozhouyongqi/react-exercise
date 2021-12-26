


/**
 * 
 * @param {*} segmentation 
 * @return 返回图片分割后人体区域的坐标 top, left, bottom, right
 */
export const getSegmentationArea = (segmentation) => {
  if (!segmentation || !segmentation.data) {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  }
  // data应该是从上到下，从左到右输出的。
  const {width, height, data} = segmentation;
  let i = 0;
  let j = 0;
  let pos = 0;
  let topMin = Number.MAX_SAFE_INTEGER, topMax = -1, leftMin = Number.MAX_SAFE_INTEGER, leftMax = -1;
  for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
      pos = i* width + j;
      const currentPosFlag = data[pos];
      if (currentPosFlag === 1) { // foregroundIds可以设置
        if (j <= leftMin) {
          leftMin = j;
        }
        if (j > leftMax) {
          leftMax = j;
        }

        if (i <= topMin) {
          topMin = i;
        }
        if (i > topMax) {
          topMax = i;
        }
      }
    }
  }
  return {
    top: topMin, 
    left: leftMin,
    bottom: topMax,
    right: leftMax
  }
}