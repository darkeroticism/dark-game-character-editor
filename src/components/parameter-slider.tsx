import { Box, Flex, Switch, Slider, Title, useMantineTheme } from '@mantine/core';
import { rankInfo } from '../dohna-dohna/data';
import styles from '../styles/title.module.css';

type ParameterSliderProps = {
  title: string;
  value: number | null;
  onChange: (value: number | null) => void;
  initialValue: number;
};

export const ParameterSlider = ({ title, value, onChange, initialValue }: ParameterSliderProps) => {
  const theme = useMantineTheme();

  // スライダーのスタイル
  const sliderStyles = {
    markLabel: { color: theme.colors.black[5] },
  };

  const handleSwitchChange = (checked: boolean) => {
    onChange(checked ? null : initialValue);
  };

  const handleSliderChange = (newValue: number) => {
    onChange(newValue);
  };

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={5}>
        <Box>
          <Title order={3} className={styles.blackYellowTitle}>
            {title}
          </Title>
        </Box>
        <Switch
          label="ランダム"
          checked={value === null}
          onChange={(event) => handleSwitchChange(event.currentTarget.checked)}
        />
      </Flex>
      <Slider
        min={1}
        max={10}
        step={1}
        value={value !== null ? value : initialValue}
        onChange={handleSliderChange}
        disabled={value === null}
        marks={rankInfo.map((r) => ({ value: r.value, label: r.name }))}
        label={(val: number) => {
          const rank = rankInfo.find((r) => r.value === val);
          return rank ? rank.description : '';
        }}
        mb="md"
        styles={sliderStyles}
      />
    </Box>
  );
};
