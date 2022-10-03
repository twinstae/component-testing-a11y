import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import DarkModeButton from './DarkModeButton';

describe('DarkModeButton', () => {
  it('다크 모드 버튼을 렌더할 수 있다', () => {
    render(<DarkModeButton />);

    const button = screen.getByRole('button', { name: '현재 다크 모드' });

    expect(button).toBeInTheDocument();
  });
});
