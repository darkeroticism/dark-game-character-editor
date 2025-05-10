import { Box, Flex, Textarea, Switch, Text } from '@mantine/core';

type ProfileInputProps = {
  value: string | null;
  onChange: (value: string, index: number) => void;
  index: number;
  placeholder: string;
  isRandom: boolean;
  onRandomChange: (isRandom: boolean, index: number) => void;
  error?: string;
  maxCount: number;
};

export const ProfileInput = ({
  value,
  onChange,
  index,
  placeholder,
  isRandom,
  onRandomChange,
  error,
  maxCount,
}: ProfileInputProps) => {
  const count = value?.length ?? 0;

  return (
    <Box mb="xs">
      <Flex align="center" gap="md" mb={5}>
        <Textarea
          placeholder={placeholder}
          value={isRandom ? '' : value || ''}
          onChange={(e) => onChange(e.target.value, index)}
          disabled={isRandom}
          autosize
          minRows={2}
          style={{ flex: 1 }} // Textareaがスペースを最大限使うように
        />
        <Text size="sm" style={{ whiteSpace: 'nowrap' }} c={count > maxCount ? 'red' : undefined}>
          {`${count} / ${maxCount}`}
        </Text>
        <Switch
          label="ランダム"
          checked={isRandom}
          onChange={(event) => onRandomChange(event.currentTarget.checked, index)}
        />
      </Flex>
      {error && (
        <Text c="red" size="xs">
          {error}
        </Text>
      )}
    </Box>
  );
};
