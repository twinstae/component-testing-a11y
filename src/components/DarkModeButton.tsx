import MoonIcon from '../icons/MoonIcon';

function DarkModeButton() {
  return (
    <button
      type="button"
      aria-label="현재 다크 모드"
      className="btn btn-circle"
    >
      <MoonIcon />
    </button>
  );
}

export default DarkModeButton;
