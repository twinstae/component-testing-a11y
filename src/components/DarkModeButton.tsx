import { useContext } from 'react';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';
import { DarkModeContext } from './DarkModeContext';

function DarkModeButton() {
  const { isDark, toggleDark } = useContext(DarkModeContext);

  const label = isDark
    ? '현재 다크 모드, 라이트 모드로 전환하려면 클릭하세요'
    : '현재 라이트 모드, 다크 모드로 전환하려면 클릭하세요';
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
