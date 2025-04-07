import { Jinzai, rankToSliderValue, sliderValueToRank, rankValues } from '../DohnaDohna/data';
import {
  TextInput,
  Textarea,
  Stack,
  Title,
  Box,
  Slider,
  Switch,
  Flex,
} from '@mantine/core';
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

  return (
    <Stack gap="md">
      <Title order={2}>ジンザイ設定</Title>

      <Box>
        <TextInput
          label="画像ファイル名"
          placeholder="画像ファイル名を入力してください"
          value={jinzai.image}
          onChange={(e) => onChange('image', e.target.value)}
        />
      </Box>

      <Box>
        <TextInput
          label="名前 (最大6文字)"
          placeholder="名前を入力してください"
          value={modelToView(jinzai.name, '')}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </Box>

      <Box>
        <Flex align="center" justify="space-between" mb={5}>
          <Box>ルックス</Box>
          <Switch
            label="ランダム"
            checked={jinzai.looks === null || jinzai.looks === undefinedRandomText}
            onChange={(event) =>
              onChange(
                'looks',
                event.currentTarget.checked ? undefinedRandomText : sliderValueToRank(5)
              )
            }
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
        />
      </Box>

      <Box>
        <Flex align="center" justify="space-between" mb={5}>
          <Box>テクニック</Box>
          <Switch
            label="ランダム"
            checked={jinzai.technic === null || jinzai.technic === undefinedRandomText}
            onChange={(event) =>
              onChange(
                'technic',
                event.currentTarget.checked ? undefinedRandomText : sliderValueToRank(5)
              )
            }
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
        />
      </Box>

      <Box>
        <Flex align="center" justify="space-between" mb={5}>
          <Box>メンタル</Box>
          <Switch
            label="ランダム"
            checked={jinzai.mental === null || jinzai.mental === undefinedRandomText}
            onChange={(event) =>
              onChange(
                'mental',
                event.currentTarget.checked ? undefinedRandomText : sliderValueToRank(5)
              )
            }
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
        />
      </Box>

      <Box>
        <Box mb="xs">属性 (最大3つ)</Box>
        <Box mb="xs">
          選択中: {jinzai.attributes.filter((attr) => attr !== 'なし（空欄）').join(', ') || 'なし'}
        </Box>
        <AttributeSelector
          selectedAttributes={jinzai.attributes.filter((attr) => attr !== 'なし（空欄）')}
          onChange={handleAttributeChange}
          attributes={attributes}
        />
      </Box>

      <Box>
        <Box mb="xs">処女設定 {jinzai.isVergin === true ? '(処女)' : jinzai.isVergin === false ? '(非処女)' : '(ランダム（未選択）)'}</Box>
        <VirginSelector
          selectedVirgin={jinzai.isVergin}
          onChange={(value) => onChange('isVergin', value)}
        />
      </Box>

      <Box>
        <Box mb="xs">音声 {jinzai.voice ? `(${jinzai.voice})` : '(未選択)'}</Box>
        <VoiceSelector
          selectedVoice={jinzai.voice}
          onChange={(value) => onChange('voice', value || '')}
          voices={voices}
        />
      </Box>

      <Box>
        <Box mb="xs">プロフィール (最大3行)</Box>
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
    </Stack>
  );
};
