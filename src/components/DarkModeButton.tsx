import { useState } from 'react';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';

function DarkModeButton() {
  const [isDark, setIsDark] = useState(true);

  const label = isDark ? '현재 다크 모드' : '현재 라이트 모드';

  function toggleDark() {
    setIsDark((old) => !old);
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => toggleDark()}
      className="btn btn-circle btn-primary border-2"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default DarkModeButton;
