import { useEffect, useState } from "react";

interface WindowDimensions {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.outerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
}
