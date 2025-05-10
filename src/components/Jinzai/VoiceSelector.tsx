import { Box, Grid } from '@mantine/core';
import { SelectorButton } from '../SelectorButton';

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

  // 音声の表示用配列
  const displayVoices = voices;
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
              <SelectorButton
                isSelected={selectedVoice === voice}
                onClick={() => handleVoiceClick(voice)}
                isDisabled={selectedVoice !== null && selectedVoice !== voice}
                isLastCol={isLastCol}
                isLastRow={isLastRow}
              >
                {voice}
              </SelectorButton>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
