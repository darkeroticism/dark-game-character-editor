import { Box, Grid } from '@mantine/core';
import { SelectorButton } from './SelectorButton';

export const AttributeSelector = ({
  selectedAttributes,
  onChange,
  attributes,
}: {
  selectedAttributes: string[];
  onChange: (value: string | null, index: number) => void;
  attributes: string[];
}) => {
  // 属性の表示用配列（ランダムを追加）
  const displayAttributes = [...attributes, 'ランダム1', 'ランダム2', 'ランダム3'];
  const totalRows = Math.ceil(displayAttributes.length / 5);

  // ランダム属性かどうかを判定
  const isRandomAttribute = (attr: string | null): boolean =>
    attr === 'ランダム1' || attr === 'ランダム2' || attr === 'ランダム3';

  // 属性の選択/選択解除を処理
  const handleAttributeClick = (attribute: string) => {
    // 現在選択されている属性の配列
    const currentSelected = [...selectedAttributes];

    if (currentSelected.includes(attribute)) {
      // 選択解除
      const newSelected = currentSelected.filter((attr) => attr !== attribute);

      // 親コンポーネントに通知
      // 選択されている属性を更新
      for (let i = 0; i < 3; i++) {
        if (i < newSelected.length) {
          onChange(newSelected[i], i);
        } else {
          onChange(null, i);
        }
      }
    } else if (currentSelected.length < 3) {
      // 新しい属性を選択（最大3つまで）
      const newSelected = [...currentSelected, attribute];

      // 親コンポーネントに通知
      // 選択されている属性を更新
      for (let i = 0; i < 3; i++) {
        if (i < newSelected.length) {
          onChange(newSelected[i], i);
        } else {
          onChange(null, i);
        }
      }
    }
  };

  return (
    <Box style={{ border: '1px solid #ced4da' }}>
      <Grid gutter={0}>
        {displayAttributes.map((attribute, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          const isLastRow = row === totalRows - 1;
          const isLastCol = col === 4;
          const isRandom = isRandomAttribute(attribute);

          // ランダム属性は通常の属性の後に表示
          if (isRandom && index < attributes.length) {
            return null;
          }

          return (
            <Grid.Col span={2.4} key={`${attribute}-${index}`}>
              <SelectorButton
                isSelected={selectedAttributes.includes(attribute)}
                onClick={() => handleAttributeClick(attribute)}
                isDisabled={
                  selectedAttributes.length >= 3 && !selectedAttributes.includes(attribute)
                }
                isLastCol={isLastCol}
                isLastRow={isLastRow}
              >
                {isRandom ? 'ランダム' : attribute}
              </SelectorButton>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
