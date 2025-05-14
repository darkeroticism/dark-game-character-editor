import { Box, Flex, TextInput, Switch } from '@mantine/core';

type KokyakuProfileInputProps = {
  value: string | null;
  onChange: (value: string, index: number) => void;
  index: number;
  placeholder: string;
  isRandom: boolean;
  onRandomChange: (isRandom: boolean, index: number) => void;
  error?: string;
};

export const KokyakuProfileInput = ({
  value,
  onChange,
  index,
  placeholder,
  isRandom,
  onRandomChange,
  error,
}: KokyakuProfileInputProps) => {
  return (
    <Box mb="xs">
      <Flex align="center" justify="space-between" mb={5}>
        <TextInput
          placeholder={placeholder}
          value={isRandom ? '' : value || ''}
          onChange={(e) => onChange(e.target.value, index)}
          disabled={isRandom}
          style={{ flex: 1 }}
          error={error}
        />
        <Switch
          label="ランダム"
          checked={isRandom}
          onChange={(event) => onRandomChange(event.currentTarget.checked, index)}
          ml="md"
        />
      </Flex>
    </Box>
  );
};
