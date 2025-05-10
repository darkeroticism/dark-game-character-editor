import { Box, Grid } from '@mantine/core';
import { SelectorButton } from '../SelectorButton';

export const VirginSelector = ({
  selectedVirgin,
  onChange,
}: {
  selectedVirgin: boolean | null;
  onChange: (value: boolean | null) => void;
}) => {
  // 処女設定の選択/選択解除を処理
  const handleVirginClick = (value: boolean) => {
    // 現在選択されている値と同じなら選択解除（未選択に）
    if (selectedVirgin === value) {
      onChange(null);
    } else {
      // 新しい値を選択
      onChange(value);
    }
  };

  // 選択肢の配列
  const options: { value: boolean; label: string }[] = [
    { value: true, label: '処女' },
    { value: false, label: '非処女' },
  ];

  return (
    <Box style={{ border: '1px solid #ced4da' }}>
      <Grid gutter={0}>
        {options.map((option, index) => {
          const isLastCol = index === options.length - 1;

          return (
            <Grid.Col span={6} key={String(option.value)}>
              <SelectorButton
                isSelected={selectedVirgin === option.value}
                onClick={() => handleVirginClick(option.value)}
                isDisabled={selectedVirgin !== null && selectedVirgin !== option.value}
                isLastCol={isLastCol}
                isLastRow={true}
              >
                {option.label}
              </SelectorButton>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
