import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0.5 }
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const observe = (node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    if (node) {
      observer.current = new IntersectionObserver(callback, options);
      observer.current.observe(node);
    }
  };

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return { observe };
};