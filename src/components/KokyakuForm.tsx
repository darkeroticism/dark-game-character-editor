import { Kokyaku, rankToSliderValue, sliderValueToRank, rankValues } from '../DohnaDohna/data';
import {
  TextInput,
  Textarea,
  Stack,
  Title,
  Box,
  Slider,
  Switch,
  Flex,
  Grid,
  Button,
} from '@mantine/core';

type KokyakuFormProps = {
  kokyaku: Kokyaku;
  onChange: (field: keyof Kokyaku, value: string, index?: number) => void;
  attributes: string[];
  rankNames: readonly string[];
  undefinedRandomText: string;
};

// 属性選択テーブルコンポーネント
const AttributeSelector = ({
  selectedAttributes,
  onChange,
  attributes,
}: {
  selectedAttributes: string[];
  onChange: (value: string, index: number) => void;
  attributes: string[];
}) => {
  // 属性の選択/選択解除を処理
  const handleAttributeClick = (attribute: string) => {
    // 現在選択されている属性の配列（なし（空欄）を除く）
    const currentSelected = [...selectedAttributes];
    
    if (currentSelected.includes(attribute)) {
      // 選択解除
      const newSelected = currentSelected.filter(attr => attr !== attribute);
      
      // 新しい配列を作成（最大3つ）
      const newAttributes = [...newSelected];
      while (newAttributes.length < 3) {
        newAttributes.push('なし（空欄）');
      }
      
      // 親コンポーネントに通知
      newAttributes.forEach((attr, index) => {
        onChange(attr, index);
      });
    } else if (currentSelected.length < 3) {
      // 新しい属性を選択（最大3つまで）
      const newSelected = [...currentSelected, attribute];
      
      // 新しい配列を作成（最大3つ）
      const newAttributes = [...newSelected];
      while (newAttributes.length < 3) {
        newAttributes.push('なし（空欄）');
      }
      
      // 親コンポーネントに通知
      newAttributes.forEach((attr, index) => {
        onChange(attr, index);
      });
    }
  };

  // 属性が選択されているかどうかを確認
  const isSelected = (attribute: string) => selectedAttributes.includes(attribute);

  // 属性の表示用配列
  const displayAttributes = attributes.slice(2);
  const totalRows = Math.ceil(displayAttributes.length / 5);

  return (
    <Box style={{ border: '1px solid #ced4da' }}>
      <Grid gutter={0}>
        {displayAttributes.map((attribute, index) => {
          const row = Math.floor(index / 5);
          const col = index % 5;
          const isLastRow = row === totalRows - 1;
          const isLastCol = col === 4;

          return (
            <Grid.Col span={2.4} key={attribute}>
              <Button
                variant={isSelected(attribute) ? "filled" : "outline"}
                color={isSelected(attribute) ? "blue" : "gray"}
                onClick={() => handleAttributeClick(attribute)}
                disabled={selectedAttributes.length >= 3 && !isSelected(attribute)}
                fullWidth
                styles={{
                  root: {
                    height: 'auto',
                    padding: '8px',
                    whiteSpace: 'normal',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    borderRadius: 0,
                    margin: 0,
                    border: 'none',
                    borderRight: isLastCol ? 'none' : '1px solid #ced4da',
                    borderBottom: isLastRow ? 'none' : '1px solid #ced4da',
                  }
                }}
              >
                {attribute}
              </Button>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};

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
  rankNames: _rankNames, // eslint-disable-line @typescript-eslint/no-unused-vars
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
        <Flex align="center" justify="space-between" mb={5}>
          <Box>インカム</Box>
          <Switch
            label="ランダム"
            checked={kokyaku.income === null || kokyaku.income === undefinedRandomText}
            onChange={(event) =>
              onChange(
                'income',
                event.currentTarget.checked ? undefinedRandomText : sliderValueToRank(5)
              )
            }
          />
        </Flex>
        <Slider
          min={1}
          max={10}
          step={1}
          value={rankToSliderValue(kokyaku.income) || 5}
          onChange={(value) => onChange('income', sliderValueToRank(value))}
          disabled={kokyaku.income === null || kokyaku.income === undefinedRandomText}
          marks={rankValues.map((rank) => ({ value: rank.sliderValue, label: rank.value }))}
          mb="md"
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
        <Box mb="xs">
          選択中: {kokyaku.target.filter(attr => attr !== 'なし（空欄）').join(', ') || 'なし'}
        </Box>
        <AttributeSelector
          selectedAttributes={kokyaku.target.filter(attr => attr !== 'なし（空欄）')}
          onChange={handleTargetChange}
          attributes={attributes}
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
