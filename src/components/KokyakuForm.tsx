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
  Text,
} from '@mantine/core';
import styles from '../styles/KokyakuForm.module.css';

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
    <Box style={{ border: '1px solid #FF007D', borderRadius: '4px', overflow: 'hidden' }}>
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
                color={isSelected(attribute) ? "pink" : "gray"}
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
                    borderRight: isLastCol ? 'none' : '1px solid #FF007D',
                    borderBottom: isLastRow ? 'none' : '1px solid #FF007D',
                    backgroundColor: isSelected(attribute) ? '#FF007D' : 'rgba(0, 0, 0, 0.3)',
                    color: isSelected(attribute) ? 'white' : '#ccc',
                    '&:hover': {
                      backgroundColor: isSelected(attribute) ? '#FF5CAB' : 'rgba(255, 0, 125, 0.2)',
                    },
                    '&:disabled': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: '#666',
                    }
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
    styles={{
      input: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: 'white',
        border: '1px solid #FFEB00',
        '&:focus': {
          borderColor: '#00D2FF',
        },
      },
    }}
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

  // スライダーのスタイル
  const sliderStyles = {
    track: { backgroundColor: 'rgba(255, 235, 0, 0.2)' },
    bar: { backgroundColor: '#FFEB00' },
    thumb: { 
      borderColor: '#FFEB00',
      backgroundColor: '#FFEB00',
      '&:hover': { backgroundColor: '#FFF68A' }
    },
    mark: { borderColor: '#00D2FF' },
    markLabel: { color: '#ccc' }
  };

  // スイッチのスタイル
  const switchStyles = {
    track: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      '&[data-checked]': {
        backgroundColor: '#FFEB00',
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
          value={kokyaku.image}
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
          value={kokyaku.name}
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

      <section className={`${styles.slantedSection} ${styles.yellow}`}>
        <Box>
          <Flex align="center" justify="space-between" mb={5}>
            <Box>
              <Title order={3} style={{ color: '#FFEB00', fontWeight: 'bold' }}>インカム</Title>
            </Box>
            <Switch
              label="ランダム"
              checked={kokyaku.income === null || kokyaku.income === undefinedRandomText}
              onChange={(event) =>
                onChange(
                  'income',
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
            value={rankToSliderValue(kokyaku.income) || 5}
            onChange={(value) => onChange('income', sliderValueToRank(value))}
            disabled={kokyaku.income === null || kokyaku.income === undefinedRandomText}
            marks={rankValues.map((rank) => ({ value: rank.sliderValue, label: rank.value }))}
            mb="md"
            styles={sliderStyles}
          />
        </Box>

        <Box mt="lg">
          <Title order={3} style={{ color: '#FFEB00', fontWeight: 'bold' }}>プレゼント</Title>
          <Text size="sm" mb="xs" style={{ color: '#ccc' }}>例: LKS↑↑, TEC↓</Text>
          {kokyaku.present.map((present, index) => (
            <PresentInput key={index} value={present} onChange={handlePresentChange} index={index} />
          ))}
        </Box>
      </section>

      <section className={`${styles.slantedSection} ${styles.cyan}`}>
        <Box>
          <Title order={3} style={{ color: '#00D2FF', fontWeight: 'bold' }}>ターゲット</Title>
          <Text size="sm" mb="xs" style={{ color: '#ccc' }}>最大3つ選択できます</Text>
          <Box mb="md" style={{ 
            padding: '8px', 
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            borderRadius: '4px',
            border: '1px solid #00D2FF'
          }}>
            <Text size="sm" style={{ color: '#00D2FF', fontWeight: 'bold' }}>選択中:</Text>
            <Text style={{ color: 'white' }}>
              {kokyaku.target.filter(attr => attr !== 'なし（空欄）').join(', ') || 'なし'}
            </Text>
          </Box>
          <AttributeSelector
            selectedAttributes={kokyaku.target.filter(attr => attr !== 'なし（空欄）')}
            onChange={handleTargetChange}
            attributes={attributes}
          />
        </Box>
      </section>

      <section className={`${styles.slantedSection} ${styles.magenta}`}>
        <Box>
          <Title order={3} style={{ color: '#FF007D', fontWeight: 'bold' }}>プロフィール</Title>
          <Text size="sm" mb="xs" style={{ color: '#ccc' }}>最大2行です。未入力の場合「空欄（なし）」となります</Text>
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
      </section>
    </Stack>
  );
};
