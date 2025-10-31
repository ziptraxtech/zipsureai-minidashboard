import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Delay slightly to allow layout to mount, then scroll
    const id = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior }));
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}
