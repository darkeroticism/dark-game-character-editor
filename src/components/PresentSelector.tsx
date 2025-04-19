import { Box, Grid, Badge } from '@mantine/core';
import { SelectorButton } from './SelectorButton';
import { Attribute } from '../DohnaDohna/Attribute';
import { attributes as allAttributes } from '../DohnaDohna/Attribute';

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

  // 属性名から属性オブジェクトを取得する関数
  const getAttributeByName = (name: string): Attribute | undefined => {
    return allAttributes.find(attr => attr.name === name);
  };

  // 属性かどうかを判定する関数
  const isAttribute = (name: string): boolean => {
    return allAttributes.some(attr => attr.name === name);
  };

  return (
    <Box style={{ border: '1px solid #ced4da' }} mb="xs">
      <Grid gutter={0}>
        {presentOptions.map((present, idx) => {
          const row = Math.floor(idx / 5);
          const col = idx % 5;
          const isLastRow = row === totalRows - 1;
          const isLastCol = col === 4;
          const attribute = isAttribute(present) ? getAttributeByName(present) : undefined;

          return (
            <Grid.Col span={2.4} key={present}>
              <SelectorButton
                isSelected={selectedPresent === present}
                onClick={() => handlePresentClick(present)}
                isDisabled={selectedPresent !== null && selectedPresent !== present}
                isLastCol={isLastCol}
                isLastRow={isLastRow}
              >
                <>
                  {present}
                  {attribute?.isCongenital && (
                    <Badge 
                      size="xs" 
                      color="pink.5" 
                      style={{ 
                        marginLeft: '4px',
                        color: 'white'
                      }}
                    >
                      先天性
                    </Badge>
                  )}
                </>
              </SelectorButton>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
