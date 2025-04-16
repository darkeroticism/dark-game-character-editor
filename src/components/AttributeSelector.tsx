import { Box, Grid } from '@mantine/core';
import { SelectorButton } from './SelectorButton';

export const AttributeSelector = ({
  selectedAttributes,
  onChange,
  attributes,
}: {
  selectedAttributes: string[];
  onChange: (value: string, index: number) => void;
  attributes: string[];
}) => {
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
              <SelectorButton
                selectedAttributes={selectedAttributes}
                onChange={onChange}
                isLastCol={isLastCol}
                isLastRow={isLastRow}
              >
                {attribute}
              </SelectorButton>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
