import { Box, Title, Text } from '@mantine/core';
import styles from '../styles/title.module.css';

export const FileInputSection = () => {
  return (
    <Box mt="lg" mb="lg">
      <Box mb="xs">
        <Title order={3} className={styles.blackYellowTitle}>
          ファイル読み込み
        </Title>
        <Text size="sm">
          既存のキャラクターファイルを編集する場合は、画面上の任意の場所にファイルをドラッグ＆ドロップで読み込めます（※
          Shift-JISエンコードされた.txtファイルに対応しています）
        </Text>
        <Text size="sm">
          編集が完了したら、画面下部の「.txtファイルを生成してダウンロード」ボタンを押して保存できます。
        </Text>
      </Box>
    </Box>
  );
};
