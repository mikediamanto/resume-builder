import React, { useEffect, useState } from "react";

export const useDimensions = (containerRef: React.RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const { current: currentRef } = containerRef;

    const getDimensions = () => ({
      width: currentRef?.offsetWidth || 0,
      height: currentRef?.offsetHeight || 0,
    });

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries?.[0];
      if (entry) {
        setDimensions(getDimensions());
      }
    });

    if (currentRef) {
      resizeObserver.observe(currentRef);
      setDimensions(getDimensions());
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
        resizeObserver.disconnect();
      }
    };
  }, [containerRef]);

  return dimensions;
};
