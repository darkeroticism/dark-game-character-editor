import { Box, Grid, Button } from '@mantine/core';

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

  // 選択されているかどうかを確認
  const isSelected = (value: boolean) => selectedVirgin === value;

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
              <Button
                variant={isSelected(option.value) ? 'filled' : 'outline'}
                color={isSelected(option.value) ? 'blue' : 'gray'}
                onClick={() => handleVirginClick(option.value)}
                disabled={selectedVirgin !== null && selectedVirgin !== option.value}
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
                  },
                }}
              >
                {option.label}
              </Button>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
