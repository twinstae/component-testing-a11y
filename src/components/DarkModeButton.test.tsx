import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import DarkModeButton from './DarkModeButton';
import userEvent from '@testing-library/user-event';

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
});
