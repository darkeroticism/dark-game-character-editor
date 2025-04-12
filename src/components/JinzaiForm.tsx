import { Jinzai, rankToSliderValue, sliderValueToRank, rankValues } from '../DohnaDohna/data';
import { TextInput, Textarea, Stack, Title, Box, Slider, Switch, Flex, Text } from '@mantine/core';
import styles from '../styles/JinzaiForm.module.css';
import { AttributeSelector } from './AttributeSelector';
import { VoiceSelector } from './VoiceSelector';
import { VirginSelector } from './VirginSelector';

type JinzaiFormProps = {
  jinzai: Jinzai;
  onChange: (field: keyof Jinzai, value: string | boolean | null, index?: number) => void;
  attributes: string[];
  rankNames: readonly string[];
  voices: string[];
  undefinedRandomText: string;
};

// 値がnullの場合に表示用の値を返す
const modelToView = (value: string | null, defaultValue: string): string => {
  return value !== null ? value : defaultValue;
};

// プロフィール入力コンポーネント
const ProfileInput = ({
  value,
  onChange,
  index,
  placeholder,
}: {
  value: string;
  onChange: (value: string, index: number) => void;
  index: number;
  placeholder: string;
}) => (
  <Textarea
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value, index)}
    mb="xs"
    autosize
    minRows={2}
    styles={{
      input: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: 'white',
        border: '1px solid #FF007D',
        '&:focus': {
          borderColor: '#00D2FF',
        },
      },
    }}
  />
);

export const JinzaiForm = ({
  jinzai,
  onChange,
  attributes,
  rankNames: _rankNames, // eslint-disable-line @typescript-eslint/no-unused-vars
  voices,
  undefinedRandomText,
}: JinzaiFormProps) => {
  // 属性変更ハンドラー
  const handleAttributeChange = (value: string, index: number) => {
    onChange('attributes', value, index);
  };

  // プロフィール変更ハンドラー
  const handleProfileChange = (value: string, index: number) => {
    onChange('profile', value, index);
  };

  // スライダーのスタイル
  const sliderStyles = {
    track: { backgroundColor: 'rgba(255, 0, 125, 0.2)' },
    bar: { backgroundColor: '#FF007D' },
    thumb: { 
      borderColor: '#FF007D',
      backgroundColor: '#FF007D',
      '&:hover': { backgroundColor: '#FF5CAB' }
    },
    mark: { borderColor: '#00D2FF' },
    markLabel: { color: '#ccc' }
  };

  // スイッチのスタイル
  const switchStyles = {
    track: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      '&[data-checked]': {
        backgroundColor: '#FF007D',
      }
    }
  };

  return (
    <Stack gap="lg">
      <Box>
        <Title order={3} style={{ color: '#FF007D', fontWeight: 'bold' }}>画像</Title>
        <Text size="sm" mb="xs" style={{ color: '#ccc' }}>未入力の場合はランダムとなります</Text>
        <TextInput
          label="ファイル名"
          placeholder="画像ファイル名を入力してください"
          value={jinzai.image}
          onChange={(e) => onChange('image', e.target.value)}
          styles={{
            input: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              border: '1px solid #FF007D',
              '&:focus': {
                borderColor: '#00D2FF',
              },
            },
            label: {
              color: '#FFEB00',
            }
          }}
        />
      </Box>

      <Box>
        <Title order={3} style={{ color: '#FF007D', fontWeight: 'bold' }}>名前</Title>
        <Text size="sm" mb="xs" style={{ color: '#ccc' }}>未入力の場合はランダムとなります</Text>
        <TextInput
          label="名前 (最大6文字)"
          placeholder="名前を入力してください"
          value={modelToView(jinzai.name, '')}
          onChange={(e) => onChange('name', e.target.value)}
          styles={{
            input: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              border: '1px solid #FF007D',
              '&:focus': {
                borderColor: '#00D2FF',
              },
            },
            label: {
              color: '#FFEB00',
            }
          }}
        />
      </Box>

      <section className={`${styles.slantedSection} ${styles.cyan}`}>
        <Box>
          <Flex align="center" justify="space-between" mb={5}>
            <Box>
              <Title order={3} style={{ color: '#00D2FF', fontWeight: 'bold' }}>ルックス</Title>
            </Box>
            <Switch
              label="ランダム"
              checked={jinzai.looks === null || jinzai.looks === undefinedRandomText}
              onChange={(event) =>
                onChange(
                  'looks',
                  event.currentTarget.checked ? undefinedRandomText : sliderValueToRank(5)
                )
              }
              styles={switchStyles}
            />
          </Flex>
          <Slider
            min={1}
            max={10}
            step={1}
            value={rankToSliderValue(jinzai.looks) || 5}
            onChange={(value) => onChange('looks', sliderValueToRank(value))}
            disabled={jinzai.looks === null || jinzai.looks === undefinedRandomText}
            marks={rankValues.map((rank) => ({ value: rank.sliderValue, label: rank.value }))}
            mb="md"
            styles={sliderStyles}
          />
        </Box>

        <Box>
          <Flex align="center" justify="space-between" mb={5}>
            <Box>
              <Title order={3} style={{ color: '#00D2FF', fontWeight: 'bold' }}>テクニック</Title>
            </Box>
            <Switch
              label="ランダム"
              checked={jinzai.technic === null || jinzai.technic === undefinedRandomText}
              onChange={(event) =>
                onChange(
                  'technic',
                  event.currentTarget.checked ? undefinedRandomText : sliderValueToRank(5)
                )
              }
              styles={switchStyles}
            />
          </Flex>
          <Slider
            min={1}
            max={10}
            step={1}
            value={rankToSliderValue(jinzai.technic) || 5}
            onChange={(value) => onChange('technic', sliderValueToRank(value))}
            disabled={jinzai.technic === null || jinzai.technic === undefinedRandomText}
            marks={rankValues.map((rank) => ({ value: rank.sliderValue, label: rank.value }))}
            mb="md"
            styles={sliderStyles}
          />
        </Box>

        <Box>
          <Flex align="center" justify="space-between" mb={5}>
            <Box>
              <Title order={3} style={{ color: '#00D2FF', fontWeight: 'bold' }}>メンタル</Title>
            </Box>
            <Switch
              label="ランダム"
              checked={jinzai.mental === null || jinzai.mental === undefinedRandomText}
              onChange={(event) =>
                onChange(
                  'mental',
                  event.currentTarget.checked ? undefinedRandomText : sliderValueToRank(5)
                )
              }
              styles={switchStyles}
            />
          </Flex>
          <Slider
            min={1}
            max={10}
            step={1}
            value={rankToSliderValue(jinzai.mental) || 5}
            onChange={(value) => onChange('mental', sliderValueToRank(value))}
            disabled={jinzai.mental === null || jinzai.mental === undefinedRandomText}
            marks={rankValues.map((rank) => ({ value: rank.sliderValue, label: rank.value }))}
            mb="md"
            styles={sliderStyles}
          />
        </Box>
      </section>

      <section className={`${styles.slantedSection} ${styles.yellow}`}>
        <Box>
          <Box mb="xs">
            <Title order={3} style={{ color: '#FFEB00', fontWeight: 'bold' }}>属性</Title>
            <Text size="sm" style={{ color: '#ccc' }}>最大3つ。未選択の場合は空欄となります。ランダムにしたい場合はランダムを選択してください</Text>
          </Box>
          <AttributeSelector
            selectedAttributes={jinzai.attributes.filter((attr) => attr !== 'なし（空欄）')}
            onChange={handleAttributeChange}
            attributes={attributes}
          />
        </Box>

        <Box mt="lg">
          <Box mb="xs">
            <Title order={3} style={{ color: '#FFEB00', fontWeight: 'bold' }}>処女</Title>
            <Text size="sm" style={{ color: '#ccc' }}>未選択の場合はランダムとなります</Text>
          </Box>
          <VirginSelector
            selectedVirgin={jinzai.isVergin}
            onChange={(value) => onChange('isVergin', value)}
          />
        </Box>
      </section>

      <section className={`${styles.slantedSection} ${styles.magenta}`}>
        <Box>
          <Box mb="xs">
            <Title order={3} style={{ color: '#FF007D', fontWeight: 'bold' }}>音声</Title>
            <Text size="sm" style={{ color: '#ccc' }}>未選択の場合はランダムとなります</Text>
          </Box>
          <VoiceSelector
            selectedVoice={jinzai.voice}
            onChange={(value) => onChange('voice', value || '')}
            voices={voices}
          />
        </Box>

        <Box mt="lg">
          <Box mb="xs">
            <Title order={3} style={{ color: '#FF007D', fontWeight: 'bold' }}>プロフィール</Title>
            <Text size="sm" style={{ color: '#ccc' }}>最大3行です。未入力の場合「空欄（なし）」となります</Text>
          </Box>
          <ProfileInput
            value={jinzai.profile[0] || ''}
            onChange={handleProfileChange}
            index={0}
            placeholder="1行目"
          />
          <ProfileInput
            value={jinzai.profile[1] || ''}
            onChange={handleProfileChange}
            index={1}
            placeholder="2行目"
          />
          <ProfileInput
            value={jinzai.profile[2] || ''}
            onChange={handleProfileChange}
            index={2}
            placeholder="3行目"
          />
        </Box>
      </section>
    </Stack>
  );
};
