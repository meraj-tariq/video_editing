export const getNewSize = (
    width: number,
    height: number,
    ratioX: number,
    ratioY: number
  ) => {
    const obj: { width?: number; height?: number } = {};
    if (ratioX > ratioY) {
      height = Math.ceil((width * ratioY) / ratioX);
      obj.width = width;
      obj.height = height % 2 === 0 ? height : height + 1;
    } else if (ratioY > ratioX) {
      width = Math.ceil((height * ratioX) / ratioY);
      obj.height = height;
      obj.width = width % 2 === 0 ? width : width + 1;
    } else {
      obj.width = width;
      obj.height = height;
    }

    return obj;
  };
