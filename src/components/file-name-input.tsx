import { TextInput, Box, Title, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { CharacterType } from '../dohna-dohna/data';
import { getFileName } from '../utils/file-name-utils';
import styles from '../styles/title.module.css';

type FileNameInputProps = {
  characterType: CharacterType;
  characterName: string | null;
  onChange: (fileName: string) => void;
};

export const FileNameInput = ({ characterType, characterName, onChange }: FileNameInputProps) => {
  const defaultFileName = getFileName(characterType, characterName).replace('.txt', '');
  const [fileName, setFileName] = useState(defaultFileName);

  // キャラクタータイプまたは名前が変更されたときにデフォルトのファイル名を更新
  useEffect(() => {
    const newDefaultFileName = getFileName(characterType, characterName).replace('.txt', '');
    setFileName(newDefaultFileName);
    onChange(`${newDefaultFileName}.txt`);
  }, [characterType, characterName, onChange]);

  const handleChange = (value: string) => {
    setFileName(value);
    onChange(`${value}.txt`);
  };

  return (
    <Box mt="md" mb="md">
      <Title order={3} className={styles.blackYellowTitle}>
        ファイル名
      </Title>
      <Text size="sm" mb="xs">
        ダウンロードするファイル名をカスタムできます。
      </Text>
      <TextInput
        value={fileName}
        onChange={(event) => handleChange(event.currentTarget.value)}
        placeholder="ファイル名を入力"
        rightSection=".txt"
      />
    </Box>
  );
};
