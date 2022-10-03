import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import DarkModeButton from './DarkModeButton';
import userEvent from '@testing-library/user-event';
import ReactDOMServer from 'react-dom/server';

describe('DarkModeButton', () => {
  const $html = document.getElementsByTagName('html')[0];

  it('다크 모드 버튼을 클릭하면, 라이트 모드로 바뀌고, 다시 클릭하면 다크 모드로 돌아온다', async () => {
    const user = userEvent.setup();
    render(<DarkModeButton />);

    expect($html).toHaveAttribute('data-theme', 'forest');

    const button = screen.getByRole('button', { name: '현재 다크 모드' });
    await user.click(button);

    expect(button).toHaveAccessibleName('현재 라이트 모드');
    expect($html).toHaveAttribute('data-theme', 'emerald');

    await user.click(button);
    expect(button).toHaveAccessibleName('현재 다크 모드');
    expect($html).toHaveAttribute('data-theme', 'forest');

    // 정리
    $html.setAttribute('data-theme', '');
  });

  function renderServerSide(
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  ) {
    // 렌더해줄 container를 만들어 body에 추가합니다
    const container = document.createElement('div');
    document.body.appendChild(container);

    // container에 SSR로 렌더한 html 문자열을 넣습니다
    container.innerHTML = ReactDOMServer.renderToString(element);
    return { container };
  }

  it('서버에서는 다크 모드로 렌더되지만, 사용자가 라이트 모드를 선호하면, 라이트 모드 버튼으로 다시 렌더된다', () => {
    // html을 렌더한 div element를 가져옵니다
    const { container } = renderServerSide(<DarkModeButton />);

    // 처음에는 다크 모드로 렌더링 됩니다
    const button = screen.getByRole('button', { name: '현재 다크 모드' });

    // matchMedia에 stub을 주입합니다
    window.matchMedia = () => ({ matches: false } as MediaQueryList);

    // @testing-library/react에 hydrate option을 써서 되살립니다
    render(<DarkModeButton />, { container, hydrate: true });

    // mismatch가 있으면 여기까지 오지 못하고 에러가 납니다

    // 라이트 모드로 다시 렌더링됩니다
    expect(button).toHaveAccessibleName('현재 라이트 모드');
    expect($html).toHaveAttribute('data-theme', 'emerald');

    // matchMedia 메서드를 undefined로 되돌립니다
    Object.assign(window, { matchMedia: undefined });
  });
});
