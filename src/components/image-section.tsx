import { Box, TextInput, Title, Text, List } from '@mantine/core';
import styles from '../styles/title.module.css';

type ImageSectionProps = {
  image: string | null;
  onChange: (value: string | null) => void;
};

export const ImageSection = ({ image, onChange }: ImageSectionProps) => {
  return (
    <Box>
      <Title order={3} className={styles.blackYellowTitle}>
        画像
      </Title>
      <List>
        <List.Item>
          <Text size="sm" mb="xs">
            未入力の場合はランダムとなります
          </Text>
        </List.Item>
        <List.Item>
          <Text size="sm" mb="xs">
            .pngファイルのみ対応しています
          </Text>
        </List.Item>
        <List.Item>
          <Text size="sm" mb="xs">
            拡張子は未入力でもファイル出力時に自動で付与されます（入力されていた場合は付与しません）
          </Text>
        </List.Item>
      </List>
      <TextInput
        label="ファイル名"
        placeholder="画像ファイル名を入力してください"
        value={image || ''}
        onChange={(e) => onChange(e.target.value === '' ? null : e.target.value)}
      />
    </Box>
  );
};
