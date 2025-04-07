import { Kokyaku } from '../DohnaDohna/data';
import { TextInput, Select, Textarea, Stack, Title, Box } from '@mantine/core';

type KokyakuFormProps = {
  kokyaku: Kokyaku;
  onChange: (field: keyof Kokyaku, value: string, index?: number) => void;
  attributes: string[];
  rankNames: readonly string[];
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

// プレゼント入力コンポーネント
const PresentInput = ({
  value,
  onChange,
  index,
}: {
  value: string;
  onChange: (value: string, index: number) => void;
  index: number;
}) => (
  <TextInput
    placeholder="プレゼント (例: LKS↑↑, TEC↓)"
    value={value}
    onChange={(e) => onChange(e.target.value, index)}
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

export const KokyakuForm = ({
  kokyaku,
  onChange,
  attributes,
  rankNames,
  undefinedRandomText,
}: KokyakuFormProps) => {
  // 属性変更ハンドラー
  const handleTargetChange = (value: string, index: number) => {
    onChange('target', value, index);
  };

  // プレゼント変更ハンドラー
  const handlePresentChange = (value: string, index: number) => {
    onChange('present', value, index);
  };

  // プロフィール変更ハンドラー
  const handleProfileChange = (value: string, index: number) => {
    onChange('profile', value, index);
  };

  // プロフィールの値を取得
  const getProfileValue = (index: number): string => {
    if (!kokyaku.profile) return '';
    const profiles = kokyaku.profile as string[];
    return profiles[index] || '';
  };

  return (
    <Stack gap="md">
      <Title order={2}>コキャク設定</Title>

      <Box>
        <TextInput
          label="画像ファイル名"
          placeholder="画像ファイル名を入力してください"
          value={kokyaku.image}
          onChange={(e) => onChange('image', e.target.value)}
        />
      </Box>

      <Box>
        <TextInput
          label="名前 (最大6文字)"
          placeholder="名前を入力してください"
          value={kokyaku.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </Box>

      <Box>
        <Select
          label="インカム"
          value={modelToView(kokyaku.income, undefinedRandomText)}
          onChange={(value) => onChange('income', value || '')}
          data={rankNames.map((rank) => ({ value: rank, label: rank }))}
        />
      </Box>

      <Box>
        <Box mb="xs">プレゼント</Box>
        {kokyaku.present.map((present, index) => (
          <PresentInput key={index} value={present} onChange={handlePresentChange} index={index} />
        ))}
      </Box>

      <Box>
        <Box mb="xs">ターゲット (最大3つ)</Box>
        <AttributeSelector
          value={attributesToValue(kokyaku.target, 0)}
          onChange={handleTargetChange}
          attributes={attributes}
          index={0}
        />
        <AttributeSelector
          value={attributesToValue(kokyaku.target, 1)}
          onChange={handleTargetChange}
          attributes={attributes}
          index={1}
        />
        <AttributeSelector
          value={attributesToValue(kokyaku.target, 2)}
          onChange={handleTargetChange}
          attributes={attributes}
          index={2}
        />
      </Box>

      <Box>
        <Box mb="xs">プロフィール (最大2行)</Box>
        <ProfileInput
          value={getProfileValue(0)}
          onChange={handleProfileChange}
          index={0}
          placeholder="1行目"
        />
        <ProfileInput
          value={getProfileValue(1)}
          onChange={handleProfileChange}
          index={1}
          placeholder="2行目"
        />
      </Box>
    </Stack>
  );
};
