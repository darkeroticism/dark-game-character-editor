import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, Group } from '@mantine/core';
import styles from '../styles/FileDropZone.module.css';

type FileDropZoneProps = {
  onFileDrop: (file: File) => void;
};

export const FileDropZone = ({ onFileDrop }: FileDropZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileDrop(acceptedFiles[0]);
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
  });

  return (
    <Box
      {...getRootProps()}
      className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
    >
      <input {...getInputProps()} />
      <Group justify="center">
        <Text>
          {isDragActive
            ? 'ファイルをここにドロップ...'
            : 'ファイルをドラッグ＆ドロップするか、クリックして選択してください'}
        </Text>
      </Group>
    </Box>
  );
};
