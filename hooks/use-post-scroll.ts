import { useEffect, useState } from "react";

type ChatScrollProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
};

export const usePostScroll = ({
  containerRef,
  shouldLoadMore,
  loadMore,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const containerDiv = containerRef.current;

    const handleScroll = () => {
      if (!containerDiv) return;

      const { scrollTop, scrollHeight, clientHeight } = containerDiv;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      // Trigger loadMore when scrolled near the bottom
      if (distanceFromBottom < 100 && shouldLoadMore) {
        loadMore();
      }
    };

    containerDiv?.addEventListener("scroll", handleScroll);

    return () => {
      containerDiv?.removeEventListener("scroll", handleScroll);
    };
  }, [shouldLoadMore, loadMore, containerRef]);

  useEffect(() => {
    if (!hasInitialized && containerRef.current) {
      setHasInitialized(true);
    }
  }, [containerRef, hasInitialized]);
};
