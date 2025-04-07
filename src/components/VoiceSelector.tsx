import { Box, Grid, Button } from '@mantine/core';

export const VoiceSelector = ({
  selectedVoice,
  onChange,
  voices,
}: {
  selectedVoice: string | null;
  onChange: (value: string | null) => void;
  voices: string[];
}) => {
  // 音声の選択/選択解除を処理
  const handleVoiceClick = (voice: string) => {
    // 現在選択されている音声と同じなら選択解除（未選択に）
    if (selectedVoice === voice) {
      onChange(null);
    } else {
      // 新しい音声を選択
      onChange(voice);
    }
  };

  // 音声が選択されているかどうかを確認
  const isSelected = (voice: string) => selectedVoice === voice;

  // 音声の表示用配列（ランダムを除く）
  const displayVoices = voices.slice(1);
  const totalRows = Math.ceil(displayVoices.length / 3);

  return (
    <Box style={{ border: '1px solid #ced4da' }}>
      <Grid gutter={0}>
        {displayVoices.map((voice, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const isLastRow = row === totalRows - 1;
          const isLastCol = col === 2;

          return (
            <Grid.Col span={4} key={voice}>
              <Button
                variant={isSelected(voice) ? 'filled' : 'outline'}
                color={isSelected(voice) ? 'blue' : 'gray'}
                onClick={() => handleVoiceClick(voice)}
                disabled={selectedVoice !== null && selectedVoice !== voice}
                fullWidth
                styles={{
                  root: {
                    height: 'auto',
                    padding: '8px',
                    whiteSpace: 'normal',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    borderRadius: 0,
                    margin: 0,
                    border: 'none',
                    borderRight: isLastCol ? 'none' : '1px solid #ced4da',
                    borderBottom: isLastRow ? 'none' : '1px solid #ced4da',
                  },
                }}
              >
                {voice}
              </Button>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
