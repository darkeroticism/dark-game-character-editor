import { Box, TextInput, Title, Text } from '@mantine/core';
import styles from '../styles/title.module.css';

type NameSectionProps = {
  name: string | null;
  onChange: (value: string | null) => void;
  maxNameCount: number;
  error?: string;
};

// 値がnullの場合に表示用の値を返す
const modelToView = (value: string | null, defaultValue: string): string => {
  return value !== null ? value : defaultValue;
};

export const NameSection = ({ name, onChange, maxNameCount, error }: NameSectionProps) => {
  return (
    <Box>
      <Title order={3} className={styles.blackYellowTitle}>
        名前
      </Title>
      <Text size="sm" mb="xs">
        未入力の場合はランダムとなります
      </Text>
      <TextInput
        label={`名前 (最大${maxNameCount}文字)`}
        placeholder="名前を入力してください"
        value={modelToView(name, '')}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            onChange(null);
          } else {
            onChange(value);
          }
        }}
        error={error}
      />
    </Box>
  );
};
