import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, Group, Loader, Stack } from '@mantine/core';
import styles from '../styles/file-drop-zone.module.css';

type FileDropZoneProps = {
  onFileDrop: (file: File) => void;
};

export const FileDropZone = ({ onFileDrop }: FileDropZoneProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastLoadedFile, setLastLoadedFile] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsLoading(true);
        try {
          const file = acceptedFiles[0];
          onFileDrop(file);
          setLastLoadedFile(file.name);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <Box
      {...getRootProps()}
      className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${isLoading ? styles.loading : ''}`}
    >
      <input {...getInputProps()} />
      <Stack align="center" gap="xs">
        {isLoading ? (
          <>
            <Loader size="md" />
            <Text>ファイルを読み込んでいます...</Text>
          </>
        ) : isDragActive ? (
          <>
            <Text size="xl" fw={700} c="blue">
              📥
            </Text>
            <Text fw={500}>ファイルをここにドロップ...</Text>
          </>
        ) : (
          <>
            <Text size="xl" fw={700} c="gray">
              📄
            </Text>
            <Text fw={500}>
              編集したいファイルをドラッグ＆ドロップするか、クリックして選択してください
            </Text>
            <Text size="sm">Shift-JISエンコードされた.txtファイルに対応しています</Text>
            {lastLoadedFile && (
              <Group gap="xs">
                <Text size="sm">✅ 最後に読み込んだファイル: {lastLoadedFile}</Text>
              </Group>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
