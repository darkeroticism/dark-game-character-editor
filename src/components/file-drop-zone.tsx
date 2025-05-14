import { useCallback, useState } from 'react';
import { Dropzone } from '@mantine/dropzone';
// 通常のドロップゾーンをコメントアウトしたため、一部のインポートはコメントアウト
import { Text, Group, Loader, Stack } from '@mantine/core';
// import styles from '../styles/file-drop-zone.module.css';

type FileDropZoneProps = {
  onFileDrop: (
    file: File
  ) => Promise<{ success: boolean; message?: string; unparseableParams?: string[] }>;
};

export const FileDropZone = ({ onFileDrop }: FileDropZoneProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastLoadedFile, setLastLoadedFile] = useState<string | null>(null);
  const [parseWarning, setParseWarning] = useState<string | null>(null);

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsLoading(true);
        try {
          const file = acceptedFiles[0];
          const result = await onFileDrop(file);
          setLastLoadedFile(file.name);

          if (!result.success && result.unparseableParams && result.unparseableParams.length > 0) {
            setParseWarning(`解析できなかったパラメータ: ${result.unparseableParams.join(', ')}`);
          } else if (!result.success && result.message) {
            setParseWarning(result.message);
          } else {
            setParseWarning(null);
          }
        } finally {
          setIsLoading(false);
        }
      }
    },
    [onFileDrop]
  );

  return (
    <>
      <Dropzone.FullScreen
        active={true}
        onDrop={handleDrop}
        accept={['text/plain']}
        maxFiles={1}
        // disabled={isLoading}
      >
        <Stack align="center" justify="center" gap="md" h="100%">
          {isLoading ? (
            <>
              <Loader size="md" />
              <Text size="xl">ファイルを読み込んでいます...</Text>
            </>
          ) : (
            <>
              <Dropzone.Accept>
                <Text size="xl" fw={700} c="blue">
                  📥
                </Text>
                <Text fw={500} size="xl">
                  ファイルをここにドロップ...
                </Text>
              </Dropzone.Accept>
              <Dropzone.Reject>
                <Text size="xl" fw={700} c="red">
                  ❌
                </Text>
                <Text fw={500} size="xl" c="red">
                  このファイル形式は対応していません
                </Text>
              </Dropzone.Reject>
              <Dropzone.Idle>
                <Text size="xl" fw={700} c="gray">
                  📄
                </Text>
                <Text fw={500} size="xl">
                  編集したいファイルをドラッグ＆ドロップするか、クリックして選択してください
                </Text>
                <Text size="md">Shift-JISエンコードされた.txtファイルに対応しています</Text>
                {lastLoadedFile && (
                  <Group gap="xs">
                    <Text size="md">
                      {parseWarning ? '⚠️' : '✅'} 最後に読み込んだファイル: {lastLoadedFile}
                      {parseWarning && (
                        <Text size="sm" mt={5}>
                          {parseWarning}
                        </Text>
                      )}
                    </Text>
                  </Group>
                )}
              </Dropzone.Idle>
            </>
          )}
        </Stack>
      </Dropzone.FullScreen>
    </>
  );
};
