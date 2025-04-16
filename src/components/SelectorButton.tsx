import { Button, useMantineTheme } from '@mantine/core';
import { JSX, ReactNode } from 'react';

type Props = {
  selectedAttributes: string[];
  onChange: (value: string, index: number) => void;
  isLastRow: boolean;
  isLastCol: boolean;
  children: ReactNode;
};

export const SelectorButton = ({
  selectedAttributes,
  onChange,
  isLastCol,
  isLastRow,
  children,
}: Props): JSX.Element => {
  const theme = useMantineTheme();

  const attribute = children?.toString() || ''; // 子要素を文字列として扱う

  // 属性の選択/選択解除を処理
  const handleAttributeClick = () => {
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

  return (
    <Button
      variant={isSelected(attribute) ? 'filled' : 'outline'}
      color={isSelected(attribute) ? theme.colors.yellow[5] : 'gray'}
      autoContrast={isSelected(attribute)}
      onClick={() => handleAttributeClick()}
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
  );
};
