import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // При кожній зміні маршруту скролимо нагору
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
