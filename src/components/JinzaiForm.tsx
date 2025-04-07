import { Jinzai } from '../DohnaDohna/data';
import { TextInput, Select, Radio, Textarea, Stack, Title, Group, Box } from '@mantine/core';

type JinzaiFormProps = {
  jinzai: Jinzai;
  onChange: (field: keyof Jinzai, value: string | boolean, index?: number) => void;
  attributes: string[];
  rankNames: readonly string[];
  voices: string[];
  undefinedRandomText: string;
};

// 値がnullの場合に表示用の値を返す
const modelToView = (value: string | null, defaultValue: string): string => {
  return value !== null ? value : defaultValue;
};

// 属性の値を取得
const attributesToValue = (attributes: string[], index: number): string => {
  return attributes[index] || '';
};

// 属性選択コンポーネント
const AttributeSelector = ({
  value,
  onChange,
  attributes,
  index,
}: {
  value: string;
  onChange: (value: string, index: number) => void;
  attributes: string[];
  index: number;
}) => (
  <Select
    value={value}
    onChange={(value) => onChange(value || '', index)}
    data={attributes.map((attribute) => ({ value: attribute, label: attribute }))}
    mb="xs"
  />
);

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
  rankNames,
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
        <Select
          label="ルックス"
          value={modelToView(jinzai.looks, undefinedRandomText)}
          onChange={(value) => onChange('looks', value || '')}
          data={rankNames.map((rank) => ({ value: rank, label: rank }))}
        />
      </Box>

      <Box>
        <Select
          label="テクニック"
          value={modelToView(jinzai.technic, undefinedRandomText)}
          onChange={(value) => onChange('technic', value || '')}
          data={rankNames.map((rank) => ({ value: rank, label: rank }))}
        />
      </Box>

      <Box>
        <Select
          label="メンタル"
          value={modelToView(jinzai.mental, undefinedRandomText)}
          onChange={(value) => onChange('mental', value || '')}
          data={rankNames.map((rank) => ({ value: rank, label: rank }))}
        />
      </Box>

      <Box>
        <Box mb="xs">属性 (最大3つ)</Box>
        <AttributeSelector
          value={attributesToValue(jinzai.attributes, 0)}
          onChange={handleAttributeChange}
          attributes={attributes}
          index={0}
        />
        <AttributeSelector
          value={attributesToValue(jinzai.attributes, 1)}
          onChange={handleAttributeChange}
          attributes={attributes}
          index={1}
        />
        <AttributeSelector
          value={attributesToValue(jinzai.attributes, 2)}
          onChange={handleAttributeChange}
          attributes={attributes}
          index={2}
        />
      </Box>

      <Box>
        <Box mb="xs">処女設定</Box>
        <Radio.Group
          value={jinzai.isVergin === true ? 'true' : jinzai.isVergin === false ? 'false' : ''}
          onChange={(value) => onChange('isVergin', value === 'true')}
        >
          <Group>
            <Radio value="true" label="処女 (1)" />
            <Radio value="false" label="非処女 (0)" />
          </Group>
        </Radio.Group>
      </Box>

      <Box>
        <Select
          label="音声"
          value={modelToView(jinzai.voice, undefinedRandomText)}
          onChange={(value) => onChange('voice', value || '')}
          data={voices.map((voice) => ({ value: voice, label: voice }))}
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
