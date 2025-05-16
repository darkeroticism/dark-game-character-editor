import { Button, Container } from '@mantine/core';
import styles from '../styles/parallelogram-button.module.css';

type GenerateFileButtonProps = {
  onClick: (fileName?: string) => void;
  fileName?: string;
};

export const GenerateFileButton = ({ onClick, fileName }: GenerateFileButtonProps) => (
  <div style={{ textAlign: 'center', marginTop: 30 }}>
    <Container>
      <div className={styles.parallelogramButton}>
        <Button 
          onClick={() => onClick(fileName)} 
          size="lg" 
          style={{ background: 'transparent', border: 'none' }}
        >
          .txtファイルを生成してダウンロード
        </Button>
      </div>
    </Container>
  </div>
);
