import { CharacterEditor } from './components/CharacterEditor';
import { Title } from '@mantine/core';
import { SlantedBackground } from './components/SlantedBackground';

function App() {
  return (
    <div className="App">
      <SlantedBackground type="header">
        <header>
          <Title order={1} ta="center" mb="lg" className="game-logo">
            ドーナドーナ キャラクターエディター
          </Title>
        </header>
      </SlantedBackground>
      <SlantedBackground type="normal">
        <main>
          <CharacterEditor />
        </main>
      </SlantedBackground>
    </div>
  );
}

export default App;
