import { Box, Grid, Button } from '@mantine/core';

export const AttributeSelector = ({
  selectedAttributes,
  onChange,
  attributes,
}: {
  selectedAttributes: string[];
  onChange: (value: string, index: number) => void;
  attributes: string[];
}) => {
  // 属性の選択/選択解除を処理
  const handleAttributeClick = (attribute: string) => {
    // 現在選択されている属性の配列（なし（空欄）を除く）
    const currentSelected = [...selectedAttributes];

    if (currentSelected.includes(attribute)) {
      // 選択解除
      const newSelected = currentSelected.filter((attr) => attr !== attribute);

      // 新しい配列を作成（最大3つ）
      const newAttributes = [...newSelected];
      while (newAttributes.length < 3) {
        newAttributes.push('なし（空欄）');
      }

      // 親コンポーネントに通知
      newAttributes.forEach((attr, index) => {
        onChange(attr, index);
      });
    } else if (currentSelected.length < 3) {
      // 新しい属性を選択（最大3つまで）
      const newSelected = [...currentSelected, attribute];

      // 新しい配列を作成（最大3つ）
      const newAttributes = [...newSelected];
      while (newAttributes.length < 3) {
        newAttributes.push('なし（空欄）');
      }

      // 親コンポーネントに通知
      newAttributes.forEach((attr, index) => {
        onChange(attr, index);
      });
    }
  };

  // 属性が選択されているかどうかを確認
  const isSelected = (attribute: string) => selectedAttributes.includes(attribute);

  // 属性の表示用配列
  const displayAttributes = attributes.slice(2);
  const totalRows = Math.ceil(displayAttributes.length / 5);

  return (
    <Box style={{ border: '1px solid #ced4da' }}>
      <Grid gutter={0}>
        {displayAttributes.map((attribute, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          const isLastRow = row === totalRows - 1;
          const isLastCol = col === 4;

          return (
            <Grid.Col span={2.4} key={attribute}>
              <Button
                variant={isSelected(attribute) ? 'filled' : 'outline'}
                color={isSelected(attribute) ? 'blue' : 'gray'}
                onClick={() => handleAttributeClick(attribute)}
                disabled={selectedAttributes.length >= 3 && !isSelected(attribute)}
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
                {attribute}
              </Button>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
