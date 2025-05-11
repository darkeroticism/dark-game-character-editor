import { Box, Title, Text } from '@mantine/core';
import { VoiceSelector } from './voice-selector';
import styles from '../styles/title.module.css';

type VoiceSectionProps = {
  voice: string | null;
  onChange: (value: string | null) => void;
  voices: string[];
};

export const VoiceSection = ({ voice, onChange, voices }: VoiceSectionProps) => {
  return (
    <Box>
      <Box mb="xs">
        <Title order={3} className={styles.blackYellowTitle}>
          音声
        </Title>
        <Text size="sm">未選択の場合はランダムとなります</Text>
      </Box>
      <VoiceSelector selectedVoice={voice} onChange={onChange} voices={voices} />
    </Box>
  );
};
