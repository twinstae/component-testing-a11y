import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import DarkModeButton from './DarkModeButton';
import userEvent from '@testing-library/user-event';

describe('DarkModeButton', () => {
  it('다크 모드 버튼을 클릭하면, 라이트 모드로 바뀐다', async () => {
    const user = userEvent.setup();
    render(<DarkModeButton />);

    const button = screen.getByRole('button', { name: /현재 다크 모드/ });

    await user.click(button);

    expect(button).toHaveAccessibleName(/현재 라이트 모드/);
  });
});
