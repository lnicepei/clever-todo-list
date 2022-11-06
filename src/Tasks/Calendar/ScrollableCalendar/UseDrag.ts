import React, { useCallback, useRef, useState } from "react";

const useDrag = () => {
  const [clicked, setClicked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const position = useRef<number>(0);

  const touchStart = useCallback((event: React.TouchEvent) => {
    position.current = event.changedTouches[0].clientX;
    setClicked(true);
  }, []);

  const dragStart = useCallback((event: React.MouseEvent) => {
    position.current = event.clientX;
    setClicked(true);
  }, []);

  const dragStop = useCallback(
    () =>
      // NOTE: need some delay so item under cursor won't be clicked
      window.requestAnimationFrame(() => {
        setDragging(false);
        setClicked(false);
      }),
    []
  );

  const dragMove = (
    event: React.MouseEvent,
    cb: (positionDifference: number) => void
  ) => {
    const newDiff = position.current - event.clientX;
    const movedEnough = Math.abs(newDiff) > 5;
    if (clicked && movedEnough) {
      setDragging(true);
    }

    if (dragging && movedEnough) {
      position.current = event.clientX;
      cb(newDiff);
    }
  };

  const wheelMove = (
    event: React.WheelEvent<HTMLDivElement>,
    cb: (positionDifference: number) => void
  ) => {
    const newDiff = event.deltaY;
    const movedEnough = Math.abs(newDiff) > 5;

    if (movedEnough) {
      position.current += event.deltaY;
      cb(newDiff);
    }
  };

  const touchMove = (
    event: React.TouchEvent,
    cb: (positionDifference: number) => void
  ) => {
    const newDiff = position.current - event.changedTouches[0].clientX;
    const movedEnough = Math.abs(newDiff) > 5;
    if (clicked && movedEnough) {
      setDragging(true);
    }

    if (dragging && movedEnough) {
      position.current = event.changedTouches[0].clientX;
      cb(newDiff);
    }
  };

  return {
    dragStart,
    touchStart,
    dragStop,
    dragMove,
    touchMove,
    wheelMove,
    dragging,
    position,
    setDragging,
  };
};
export default useDrag;
