import { Box, Grid } from '@mantine/core';
import { SelectorButton } from './SelectorButton';
import { attributes as allAttributes } from '../DohnaDohna/data';

export const PresentSelector = ({
  selectedPresent,
  onChange,
}: {
  selectedPresent: string | null;
  onChange: (value: string | null) => void;
}) => {
  // プレゼントの選択肢
  const optionsOnlyPresents = [
    'LKS↑↑',
    'LKS↑',
    'LKS↓',
    'LKS↓↓',
    'TEC↑↑',
    'TEC↑',
    'TEC↓',
    'TEC↓↓',
    'MNT↑↑',
    'MNT↑',
    'MNT↓',
    'MNT↓↓',
  ];

  // 属性とステータス変化とランダムを合わせたプレゼントの選択肢
  const presentOptions = [
    ...allAttributes.map((attr) => attr.name),
    ...optionsOnlyPresents,
    'ランダム',
  ];

  // プレゼントの選択/選択解除を処理
  const handlePresentClick = (present: string) => {
    // 現在選択されているプレゼントと同じなら選択解除（未選択に）
    if (selectedPresent === present) {
      onChange(null);
    } else {
      // 新しいプレゼントを選択
      onChange(present);
    }
  };

  const totalRows = Math.ceil(presentOptions.length / 5);

  return (
    <Box style={{ border: '1px solid #ced4da' }} mb="xs">
      <Grid gutter={0}>
        {presentOptions.map((present, idx) => {
          const row = Math.floor(idx / 5);
          const col = idx % 5;
          const isLastRow = row === totalRows - 1;
          const isLastCol = col === 4;

          return (
            <Grid.Col span={2.4} key={present}>
              <SelectorButton
                isSelected={selectedPresent === present}
                onClick={() => handlePresentClick(present)}
                isDisabled={selectedPresent !== null && selectedPresent !== present}
                isLastCol={isLastCol}
                isLastRow={isLastRow}
              >
                {present}
              </SelectorButton>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
