import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScroll } from "../../context/ScrollContext";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { scrollToTopRef } = useScroll();

  useEffect(() => {
    if (scrollToTopRef.current) {
      scrollToTopRef.current();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, scrollToTopRef]);

  return null;
}
