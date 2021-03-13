/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

type TFrameViewProps = {
  videoEl: HTMLVideoElement | null;
};

const FrameViews: React.FC<TFrameViewProps> = ({ videoEl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const coverCanvasRef = useRef<HTMLCanvasElement | null>(null);
  // const cv1 = coverCanvasRef.current!;
  // const newctx = cv1?.getContext("2d");
  const ctx = canvasRef.current?.getContext("2d");

  const { width, height } = useSelector((state) => ({
    width: state.video.VideoDimensionReducer.width!,
    height: state.video.VideoDimensionReducer.height!,
  }));

  // const [mouseDown, setMouseDown] = useState(false);
  // const [lastMousey, setLastMousey] = useState(0);
  // const [lastMouseX, setLastMouseX] = useState(0);
  // const [mousex, setMouseX] = useState(0);
  // const [mousey, setMousey] = useState(0);
  // const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // const MoveUp = () => {
  //   setMouseDown(false);
  // };

  // const MoveDown = (e: { clientX: number; clientY: number }) => {
  //   setLastMouseX(e.clientX - cv1.offsetLeft);
  //   setLastMousey(e.clientY - cv1.offsetTop);
  //   setMouseDown(true);
  // };

  // const Move = (e: { clientX: number; clientY: number }) => {
  //   setMouseX(e.clientX - cv1.offsetLeft);
  //   setMousey(e.clientY - cv1.offsetTop);

  //   if (mouseDown && newctx) {
  //     newctx.clearRect(0, 0, cv1.width, cv1.height); //clear canvas
  //     newctx.beginPath();
  //     var width = mousex - lastMouseX;
  //     var height = mousey - lastMousey;
  //     newctx.rect(lastMouseX, lastMousey, width, height);
  //     setRect({ x: lastMouseX, y: lastMousey, width, height });
  //     newctx.strokeStyle = "red";
  //     newctx.lineWidth = 2;
  //     newctx.stroke();
  //   }
  // };

  useEffect(() => {
    const frameRate = 24;
    if (ctx) {
      ctx.canvas.width = width;
      ctx.canvas.height = height;
    }

    const draw = () => {
      const drawImage = () => {
        ctx?.drawImage(videoEl!, 0, 0, width, height);
        if (!videoEl?.paused) {
          setTimeout(drawImage, 1000 / frameRate);
        }
      };
      setTimeout(drawImage, 1000 / frameRate);
    };

    videoEl?.addEventListener("play", draw);

    return () => {
      videoEl?.removeEventListener("play", draw);
    };
  }, [videoEl, ctx, width, height]);

  useEffect(() => {
    videoEl?.addEventListener("canplay", () => {
      ctx?.drawImage(videoEl!, 0, 0, width, height);
    });

    return () => {
      videoEl?.removeEventListener("canplay", () => {
        ctx?.drawImage(videoEl!, 0, 0, width, height);
      });
    };
  }, [videoEl, width, height]);

  return (
    <CanvasContainer>
      <Canvas width={width} height={height} ref={canvasRef}></Canvas>
      {/* <Canvo
        onMouseUp={MoveUp}
        onMouseDown={MoveDown}
        onMouseMove={Move}
        ref={coverCanvasRef}
      ></Canvo> */}
    </CanvasContainer>
  );
};

export default FrameViews;

const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

const Canvas = styled.canvas`
  max-width: 90%;
  height: auto;
  max-height: 350px;
`;

export const Canvo = styled.canvas`
  /* width: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  z-index: 10;
  /* background-color: rgba(255, 0, 0, 0.5); */
`;
