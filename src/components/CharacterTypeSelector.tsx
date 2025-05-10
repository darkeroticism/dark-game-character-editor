import { SegmentedControl } from '@mantine/core';
import { CharacterType } from '../DohnaDohna/data';

type CharacterTypeSelectorProps = {
  characterType: CharacterType;
  onChange: (type: CharacterType) => void;
};

export const CharacterTypeSelector = ({
  characterType,
  onChange,
}: CharacterTypeSelectorProps) => (
  <SegmentedControl
    value={characterType}
    onChange={onChange as (value: string) => void}
    data={[
      { label: 'ジンザイ', value: 'ジンザイ' },
      { label: 'コキャク', value: 'コキャク' },
    ]}
    fullWidth
    mb="md"
  />
);
