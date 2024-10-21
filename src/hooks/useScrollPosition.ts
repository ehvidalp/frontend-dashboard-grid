import { useEffect } from "react";

export const useScrollPosition = (storageKey: string) => {

  const saveScrollPosition = () => {
    const scrollPosition = window.scrollY;
    localStorage.setItem(storageKey, scrollPosition.toString());
  };


  const restoreScrollPosition = () => {
    const savedPosition = localStorage.getItem(storageKey);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  };

  useEffect(() => {
    restoreScrollPosition();

    return () => {
      saveScrollPosition();
    };
  }, []);
};