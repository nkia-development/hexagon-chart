import { MutableRefObject, useEffect, useRef, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

const useParentSize = (): [MutableRefObject<HTMLDivElement | null>, Size] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new ResizeObserver(() => {
      if (currentRef) {
        setSize({
          width: currentRef.offsetWidth,
          height: currentRef.offsetHeight,
        });
      }
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, size];
};

export default useParentSize;
