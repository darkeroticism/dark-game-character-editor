import { Box, Title, Text } from '@mantine/core';
import { PresentSelector } from './present-selector';
import styles from '../../styles/title.module.css';

type PresentSectionProps = {
  present: string | null;
  onChange: (value: string | null) => void;
};

export const PresentSection = ({ present, onChange }: PresentSectionProps) => {
  return (
    <Box>
      <Box mb="xs">
        <Title order={3} className={styles.blackYellowTitle}>
          プレゼント
        </Title>
        <Text size="sm">
          未設定の場合はプレゼント無しになります。ランダムにしたい場合は「ランダム」を選択してください。
        </Text>
        <Text size="sm">
          先天性属性は通常、レアコキャク「曲輪」しかプレゼントしないため、カスタムコキャクがプレゼントするとゲームバランスが変わるので注意。
        </Text>
      </Box>
      <PresentSelector selectedPresent={present} onChange={onChange} />
    </Box>
  );
};
