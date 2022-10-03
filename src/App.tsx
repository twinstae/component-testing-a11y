import './App.css';
import { DarkModeProvider } from './components/DarkModeContext';
import { DarkModeButton } from './components';

function App() {
  return (
    <div className="App">
      <DarkModeProvider>
        <DarkModeButton />
      </DarkModeProvider>
    </div>
  );
}

export default App;
