import { Box, Title, Text } from '@mantine/core';
import { Attribute } from '../../dohna-dohna/attribute';
import { AttributeSelector } from '../attribute-selector';
import { AttributeDetailTable } from './attribute-detail-table';
import styles from '../../styles/title.module.css';

type AttributeSectionProps = {
  attributes: (Attribute | null)[];
  onChange: (value: Attribute | null, index: number) => void;
  allAttributes: Attribute[];
};

export const AttributeSection = ({
  attributes,
  onChange,
  allAttributes,
}: AttributeSectionProps) => {
  // 属性変更ハンドラー
  const handleAttributeChange = (value: Attribute | null, index: number) => {
    onChange(value, index);
  };

  return (
    <Box>
      <Box mb="xs">
        <Title order={3} className={styles.blackYellowTitle}>
          属性
        </Title>
        <Text size="sm">
          最大3つ。
          未選択の場合は属性なしとなります。ランダムにしたい場合はランダムボタンを選択してください。
          全ての属性をランダムにしたい場合は、ランダムボタンを3つ選択してください。
        </Text>
        <Text size="sm">
          先天性属性はレアコキャク「曲輪」しかプレゼントしないため、上書きに注意
        </Text>
      </Box>
      <AttributeSelector
        selectedAttributes={attributes.filter((attr) => attr !== null)}
        onChange={handleAttributeChange}
        attributes={allAttributes}
      />
      <Box mt="md">
        <Title order={4}>選択された属性の基礎値と変動値</Title>
        <Text size="sm" mb="xs">
          各種基礎ステータスはステータスにそのまま加算され、変動ステータスはハルウリした際のステータス変動にかかる補正値となります。
          なお妊娠している場合はハルウリ時のステータス変動値に更にマイナス補正がかかります。
        </Text>
        <AttributeDetailTable
          attributes={attributes.filter((attr): attr is Attribute => attr !== null)}
        />
      </Box>
    </Box>
  );
};
