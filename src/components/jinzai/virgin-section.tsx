import { Box, Title, Text } from '@mantine/core';
import { VirginSelector } from './virgin-selector';
import styles from '../../styles/title.module.css';

type VirginSectionProps = {
  isVergin: boolean | null;
  onChange: (value: boolean | null) => void;
};

export const VirginSection = ({ isVergin, onChange }: VirginSectionProps) => {
  return (
    <Box mt="lg">
      <Box mb="xs">
        <Title order={3} className={styles.blackYellowTitle}>
          処女
        </Title>
        <Text size="sm">未選択の場合はランダムとなります</Text>
      </Box>
      <VirginSelector selectedVirgin={isVergin} onChange={onChange} />
    </Box>
  );
};
