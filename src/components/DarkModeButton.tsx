import MoonIcon from '../icons/MoonIcon';
import { useEffect, useState } from 'react';
import SunIcon from '../icons/SunIcon';

function DarkModeButton() {
  const [isDark, setIsDark] = useState(true);

  function toggleDark() {
    setIsDark((old) => !old);
  }

  useEffect(() => {
    if (window.matchMedia !== undefined) {
      setIsDark(window.matchMedia('(prefers-color-scheme:dark)')?.matches);
    }
  }, []);

  useEffect(() => {
    const $html = document.getElementsByTagName('html')[0];
    $html.setAttribute('data-theme', isDark ? 'forest' : 'emerald');
  }, [isDark]);

  const label = isDark ? '현재 다크 모드' : '현재 라이트 모드';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => toggleDark()}
      className="btn btn-circle"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
export default DarkModeButton;
