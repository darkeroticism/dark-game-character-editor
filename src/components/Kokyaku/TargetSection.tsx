import { Box, Title, Text } from '@mantine/core';
import { Attribute } from '../../DohnaDohna/attribute';
import { AttributeSelector } from '../Jinzai/AttributeSelector';
import styles from '../styles/Title.module.css';

type TargetSectionProps = {
  targets: (Attribute | null)[];
  onChange: (value: Attribute | null, index: number) => void;
  allAttributes: Attribute[];
};

export const TargetSection = ({ targets, onChange, allAttributes }: TargetSectionProps) => {
  // ターゲット変更ハンドラー
  const handleTargetChange = (value: Attribute | null, index: number) => {
    onChange(value, index);
  };

  return (
    <Box>
      <Box mb="xs">
        <Title order={3} className={styles.blackYellowTitle}>
          ターゲット
        </Title>
        <Text size="sm">
          最大3つ。
          未選択の場合はターゲットなしとなります。ランダムにしたい場合はランダムボタンを選択してください。
          全ての属性をランダムにしたい場合は、ランダムボタンを3つ選択してください。
        </Text>
      </Box>
      <AttributeSelector
        selectedAttributes={(targets || []).filter((attr) => attr !== null)}
        onChange={handleTargetChange}
        attributes={allAttributes}
      />
    </Box>
  );
};
