import { CharacterEditor } from './components/CharacterEditor';
import { Anchor, Center, Title } from '@mantine/core';
import { SlantedBackground } from './components/SlantedBackground';

export const App = () => {
  return (
    <div className="App">
      <SlantedBackground type="header">
        <header>
          <Title
            order={1}
            ta="center"
            mt="xl"
            mb="lg"
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              transform: 'translateY(10px)',
            }}
          >
            <span
              style={{
                color: 'var(--mantine-color-cyan-5)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                padding: '0 2px',
              }}
            >
              ドーナドーナ
            </span>
            <span
              style={{
                color: 'var(--mantine-color-yellow-5)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                padding: '0 2px',
              }}
            >
              キャラクター
            </span>
            <span
              style={{
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                padding: '0 2px',
              }}
            >
              エディター
            </span>
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
