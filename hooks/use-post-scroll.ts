import { useEffect } from "react";

export const usePostScroll = ({
  containerRef,
  loadMore,
}: {
  containerRef: any;
  loadMore: () => void;
}) => {
  useEffect(() => {
    const onIntersection = (items: IntersectionObserverEntry[]) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting) {
        loadMore();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && containerRef.current) {
      observer.observe(containerRef.current);
    }

    // clean up
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
};
