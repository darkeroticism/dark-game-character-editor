import { CharacterEditor } from './components/CharacterEditor';
import { Anchor, Center, Title } from '@mantine/core';
import { SlantedBackground } from './components/SlantedBackground';

export const App = () => {
  return (
    <div className="App">
      <SlantedBackground type="header">
        <header>
          <Title order={1} ta="center" mb="lg">
            ドーナドーナ キャラクターエディター
          </Title>
        </header>
      </SlantedBackground>
      <SlantedBackground type="normal">
        <main>
          <CharacterEditor />
        </main>
      </SlantedBackground>
      <SlantedBackground type="footer">
        <footer>
          <Center>
            <p>
              連絡先:{' '}
              <Anchor href="https://x.com/darkeroticism" target="_blank" rel="noopener noreferrer">
                @darkeroticism
              </Anchor>{' '}
            </p>
          </Center>
        </footer>
      </SlantedBackground>
    </div>
  );
};
