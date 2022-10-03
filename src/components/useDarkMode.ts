import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (window.matchMedia !== undefined) {
      setIsDark(window.matchMedia('(prefers-color-scheme:dark)')?.matches);
    }
  }, []);

  useEffect(() => {
    const $html = document.getElementsByTagName('html')[0];
    $html.setAttribute('data-theme', isDark ? 'forest' : 'emerald');
  }, [isDark]);

  function toggleDark() {
    setIsDark((old) => !old);
  }

  return { isDark, toggleDark };
}
