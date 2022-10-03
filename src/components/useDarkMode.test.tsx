import { describe, it, expect } from 'vitest';
import { act, render, renderHook } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import * as ReactDOMServer from 'react-dom/server';
import { useDarkMode } from './useDarkMode';

describe('useDarkMode', () => {
  const $html = document.getElementsByTagName('html')[0];

  it('isDark를 toggle하면, false로 바뀌고, 다시 toggle하면 true로 돌아온다', async () => {
    // renderHook으로 훅만 render합니다.
    const { result } = renderHook(() => useDarkMode());

    // result ref에서 isDark 상태를 검증합니다
    expect(result.current.isDark).toBe(true);
    expect($html).toHaveAttribute('data-theme', 'forest');

    // act로 감싸서 상태가 변경될 때까지 기다립니다
    act(() => result.current.toggleDark());

    expect(result.current.isDark).toBe(false);
    expect($html).toHaveAttribute('data-theme', 'emerald');

    act(() => result.current.toggleDark());

    expect(result.current.isDark).toBe(true);
    expect($html).toHaveAttribute('data-theme', 'forest');

    $html.setAttribute('data-theme', '');
  });

  function renderServerSide(element: React.ReactElement) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = ReactDOMServer.renderToString(element);
    return { container };
  }

  it('SSR에서는 다크로 렌더되지만, 사용자가 라이트 모드를 선호하면, 라이트로 다시 렌더된다', () => {
    function Story() {
      const { isDark } = useDarkMode();
      return (
        <button>{isDark ? '다크' : '라이트'}</button>
      );
    }

    const { container } = renderServerSide(<Story />);

    const button = screen.getByRole('button', { name: '다크' });

    window.matchMedia = () => ({ matches: false } as MediaQueryList);

    render(<Story />, { container, hydrate: true });

    expect(button).toHaveAccessibleName('라이트');

    Object.assign(window, { matchMedia: undefined });
  });
});
