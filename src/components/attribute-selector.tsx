import { Box, Grid, Badge } from '@mantine/core';
import { SelectorButton } from './selector-button';
import { Attribute } from '../dohna-dohna/attribute';

export const AttributeSelector = ({
  selectedAttributes,
  onChange,
  attributes,
}: {
  selectedAttributes: Attribute[];
  onChange: (value: Attribute | null, index: number) => void;
  attributes: Attribute[];
}) => {
  // 属性の表示用配列
  const randomAttributes: ReadonlyArray<Attribute> = [
    {
      name: 'ランダム1',
      isCongenital: false,
      isSecret: false,
      basicLooks: 0,
      basicTechnic: 0,
      basicMental: 0,
      fluctuatedLooks: 0,
      fluctuatedTechnic: 0,
      fluctuatedMental: 0,
    },
    {
      name: 'ランダム2',
      isCongenital: false,
      isSecret: false,
      basicLooks: 0,
      basicTechnic: 0,
      basicMental: 0,
      fluctuatedLooks: 0,
      fluctuatedTechnic: 0,
      fluctuatedMental: 0,
    },
    {
      name: 'ランダム3',
      isCongenital: false,
      isSecret: false,
      basicLooks: 0,
      basicTechnic: 0,
      basicMental: 0,
      fluctuatedLooks: 0,
      fluctuatedTechnic: 0,
      fluctuatedMental: 0,
    },
  ];
  const displayAttributes = [...attributes, ...randomAttributes];
  const totalRows = Math.ceil(displayAttributes.length / 5);

  // ランダム属性かどうかを判定
  const isRandomAttribute = (attr: Attribute | null): boolean =>
    attr?.name === 'ランダム1' || attr?.name === 'ランダム2' || attr?.name === 'ランダム3';

  // 属性の選択/選択解除を処理
  const handleAttributeClick = (attribute: Attribute) => {
    // 現在選択されている属性の配列
    const currentSelected = [...selectedAttributes];

    const isSelected = currentSelected.some((attr) => attr.name === attribute.name);

    if (isSelected) {
      // 選択解除
      const newSelected = currentSelected.filter((attr) => attr.name !== attribute.name);

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

          const isSelected = selectedAttributes.some((attr) => attr.name === attribute.name);

          return (
            <Grid.Col span={2.4} key={`${attribute.name}-${index}`}>
              <SelectorButton
                isSelected={isSelected}
                onClick={() => handleAttributeClick(attribute)}
                isDisabled={selectedAttributes.length >= 3 && !isSelected}
                isLastCol={isLastCol}
                isLastRow={isLastRow}
              >
                {isRandom ? (
                  'ランダム'
                ) : (
                  <>
                    {attribute.name}
                    {attribute.isCongenital && (
                      <Badge
                        size="xs"
                        color="pink.5"
                        style={{
                          marginLeft: '4px',
                          color: 'white',
                        }}
                      >
                        先天性
                      </Badge>
                    )}
                  </>
                )}
              </SelectorButton>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};
