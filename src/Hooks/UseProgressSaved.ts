/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { TEditInfo } from "../Components/ProgressContext";

export type TProgressData = {
  slug: string;
  width: number;
  height: number;
  start_time: string;
  end_time: string;
};

const UseSavedProgress = (savedData?: TEditInfo) => {
  const slug = localStorage.getItem("slug");
  const [index, setIndex] = useState(0);

  let existing: Array<TProgressData> = JSON.parse(
    localStorage.getItem("progress")!
  );

  const filteredProgress = existing?.filter((cb) => cb.slug === slug);
  const length = filteredProgress?.length!;
  const progressData = filteredProgress?.[index];
  let width = filteredProgress?.[0]?.width;
  let height = filteredProgress?.[0]?.height;

  useEffect(() => {
    setIndex(filteredProgress?.length - 1);
  }, []);

  const obj: { width?: number; height?: number } = {};
  const ratioX = savedData?.ratio?.x!;
  const ratioY = savedData?.ratio?.y!;
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

  const savedWidth = savedData?.ratio
    ? obj?.width
    : savedData?.dimensions
    ? savedData.dimensions.x
    : width;

  const savedHeight = savedData?.ratio
    ? obj?.height
    : savedData?.dimensions
    ? savedData.dimensions.y
    : height;

  const value = {
    slug: slug!,
    width: savedWidth!,
    height: savedHeight!,
    start_time: savedData?.start_time!,
    end_time: savedData?.end_time!,
  };

  // persist data using local storage
  const persistor = () => {
    existing?.push(value);
    localStorage.setItem("progress", JSON.stringify(existing));
  };

  return { progressData, index, setIndex, length, persistor };
};

export default UseSavedProgress;
