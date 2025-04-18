import { initialRankParamter, Jinzai, rankInfo, Attribute } from '../DohnaDohna/data';
import { TextInput, Textarea, Stack, Title, Box, Slider, Switch, Flex, Text } from '@mantine/core';
import { AttributeSelector } from './AttributeSelector';
import { VoiceSelector } from './VoiceSelector';
import { VirginSelector } from './VirginSelector';

type JinzaiFormProps = {
  jinzai: Jinzai;
  onChange: (field: keyof Jinzai, value: string | boolean | null | number | Attribute, index?: number) => void;
  attributes: Attribute[];
  voices: string[];
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
  isRandom,
  onRandomChange,
}: {
  value: string | null;
  onChange: (value: string, index: number) => void;
  index: number;
  placeholder: string;
  isRandom: boolean;
  onRandomChange: (isRandom: boolean, index: number) => void;
}) => (
  <Box mb="xs">
    <Flex align="center" justify="space-between" mb={5}>
      <Textarea
        placeholder={placeholder}
        value={isRandom ? '' : value || ''}
        onChange={(e) => onChange(e.target.value, index)}
        disabled={isRandom}
        autosize
        minRows={2}
        style={{ flex: 1 }}
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

export const JinzaiForm = ({ jinzai, onChange, attributes, voices }: JinzaiFormProps) => {
  // 属性変更ハンドラー
  const handleAttributeChange = (value: Attribute | null, index: number) => {
    onChange('attributes', value, index);
  };

  // プロフィール変更ハンドラー
  const handleProfileChange = (value: string, index: number) => {
    onChange('profiles', value, index);
  };

  // プロフィールのランダム設定変更ハンドラー
  const handleProfileRandomChange = (isRandom: boolean, index: number) => {
    onChange('profiles', isRandom ? null : '', index);
  };

  // プロフィールがランダム設定かどうかを判定
  const isProfileRandom = (index: number): boolean => {
    return jinzai.profiles[index] === null;
  };

  // スライダーのスタイル
  const sliderStyles = {
    markLabel: { color: '#111111' }, // theme.colors.black[5]の値
  };

  return (
    <Stack gap="xl">
      <Box>
        <Title order={3} c="pink">
          画像
        </Title>
        <Text size="sm" mb="xs">
          未入力の場合はランダムとなります
        </Text>
        <TextInput
          label="ファイル名"
          placeholder="画像ファイル名を入力してください"
          value={jinzai.image || ''}
          onChange={(e) => onChange('image', e.target.value === '' ? null : e.target.value)}
        />
      </Box>

      <Box>
        <Title order={3} c="pink">
          名前
        </Title>
        <Text size="sm" mb="xs">
          未入力の場合はランダムとなります
        </Text>
        <TextInput
          label="名前 (最大6文字)"
          placeholder="名前を入力してください"
          value={modelToView(jinzai.name, '')}
          onChange={(e) => onChange('name', e.target.value === '' ? null : e.target.value)}
        />
      </Box>

      <Box>
        <Flex align="center" justify="space-between" mb={5}>
          <Box>
            <Title order={3} c="pink">
              ルックス
            </Title>
          </Box>
          <Switch
            label="ランダム"
            checked={jinzai.looks === null}
            onChange={(event) =>
              onChange('looks', event.currentTarget.checked ? null : initialRankParamter)
            }
          />
        </Flex>
        <Slider
          min={1}
          max={10}
          step={1}
          value={jinzai.looks !== null ? jinzai.looks : initialRankParamter}
          onChange={(value) => onChange('looks', value)}
          disabled={jinzai.looks === null}
          marks={rankInfo.map((r) => ({ value: r.value, label: r.name }))}
          label={(val: number) => {
            const rank = rankInfo.find((r) => r.value === val);
            return rank ? rank.description : '';
          }}
          mb="md"
          styles={sliderStyles}
        />
      </Box>

      <Box>
        <Flex align="center" justify="space-between" mb={5}>
          <Box>
            <Title order={3} c="pink">
              テクニック
            </Title>
          </Box>
          <Switch
            label="ランダム"
            checked={jinzai.technic === null}
            onChange={(event) =>
              onChange('technic', event.currentTarget.checked ? null : initialRankParamter)
            }
          />
        </Flex>
        <Slider
          min={1}
          max={10}
          step={1}
          value={jinzai.technic !== null ? jinzai.technic : initialRankParamter}
          onChange={(value) => onChange('technic', value)}
          disabled={jinzai.technic === null}
          marks={rankInfo.map((r) => ({ value: r.value, label: r.name }))}
          label={(val: number) => {
            const rank = rankInfo.find((r) => r.value === val);
            return rank ? rank.description : '';
          }}
          mb="md"
          styles={sliderStyles}
        />
      </Box>

      <Box>
        <Flex align="center" justify="space-between" mb={5}>
          <Box>
            <Title order={3} c="pink">
              メンタル
            </Title>
          </Box>
          <Switch
            label="ランダム"
            checked={jinzai.mental === null}
            onChange={(event) =>
              onChange('mental', event.currentTarget.checked ? null : initialRankParamter)
            }
          />
        </Flex>
        <Slider
          min={1}
          max={10}
          step={1}
          value={jinzai.mental !== null ? jinzai.mental : initialRankParamter}
          onChange={(value) => onChange('mental', value)}
          disabled={jinzai.mental === null}
          marks={rankInfo.map((r) => ({ value: r.value, label: r.name }))}
          label={(val: number) => {
            const rank = rankInfo.find((r) => r.value === val);
            return rank ? rank.description : '';
          }}
          mb="md"
          styles={sliderStyles}
        />
      </Box>

      <Box>
        <Box mb="xs">
          <Title order={3} c="pink">
            属性
          </Title>
          <Text size="sm">
            最大3つ。
            未選択の場合は属性なしとなります。ランダムにしたい場合はランダムボタンを選択してください。
            全ての属性をランダムにしたい場合は、ランダムボタンを3つ選択してください。
          </Text>
        </Box>
        <AttributeSelector
          selectedAttributes={jinzai.attributes.filter((attr) => attr !== null)}
          onChange={handleAttributeChange}
          attributes={attributes}
        />
      </Box>

      <Box mt="lg">
        <Box mb="xs">
          <Title order={3} c="pink">
            処女
          </Title>
          <Text size="sm">未選択の場合はランダムとなります</Text>
        </Box>
        <VirginSelector
          selectedVirgin={jinzai.isVergin}
          onChange={(value) => onChange('isVergin', value)}
        />
      </Box>

      <Box>
        <Box mb="xs">
          <Title order={3} c="pink">
            音声
          </Title>
          <Text size="sm">未選択の場合はランダムとなります</Text>
        </Box>
        <VoiceSelector
          selectedVoice={jinzai.voice}
          onChange={(value) => onChange('voice', value)}
          voices={voices}
        />
      </Box>

      <Box mt="lg">
        <Box mb="xs">
          <Title order={3} c="pink">
            プロフィール
          </Title>
          <Text size="sm">最大3行です。未入力の場合「空欄（なし）」となります</Text>
        </Box>
        <ProfileInput
          value={jinzai.profiles[0]}
          onChange={handleProfileChange}
          index={0}
          placeholder="1行目"
          isRandom={isProfileRandom(0)}
          onRandomChange={handleProfileRandomChange}
        />
        <ProfileInput
          value={jinzai.profiles[1]}
          onChange={handleProfileChange}
          index={1}
          placeholder="2行目"
          isRandom={isProfileRandom(1)}
          onRandomChange={handleProfileRandomChange}
        />
        <ProfileInput
          value={jinzai.profiles[2]}
          onChange={handleProfileChange}
          index={2}
          placeholder="3行目"
          isRandom={isProfileRandom(2)}
          onRandomChange={handleProfileRandomChange}
        />
      </Box>
    </Stack>
  );
};
