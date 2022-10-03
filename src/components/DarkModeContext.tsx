import React, { createContext } from 'react';
import { useDarkMode } from './useDarkMode';

// 디폴트 값을 넣어서 Context를 만들어요
export const DarkModeContext = createContext({
  isDark: false,
  toggleDark: () => {},
});

// 상태를 내려주는 Provider component도 만들어줍니다.
export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const value = useDarkMode();

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}
