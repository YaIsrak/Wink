import { ElementRef, RefObject, useEffect, useRef, useState } from "react";

export default function useInView(
  options?: IntersectionObserverInit,
): [boolean, RefObject<ElementRef<"div">>] {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Clean-up
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [isVisible, ref];
}
