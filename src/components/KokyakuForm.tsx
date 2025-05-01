import { initialRankParamter, Kokyaku, rankInfo, maxNameCount } from '../DohnaDohna/data';
import { Attribute } from '../DohnaDohna/attribute';
import { KokyakuErrors } from './CharacterEditor'; // エラー型をインポート
import {
  TextInput,
  Stack,
  Title,
  Box,
  Slider,
  Switch,
  Flex,
  Text,
  List,
  useMantineTheme,
} from '@mantine/core';
import styles from '../styles/Title.module.css';
import { AttributeSelector } from './AttributeSelector';
import { PresentSelector } from './PresentSelector';

type KokyakuFormProps = {
  kokyaku: Kokyaku;
  onChange: (
    field: keyof Kokyaku,
    value: string | number | null | Attribute,
    index?: number
  ) => void;
  attributes: Attribute[];
  errors: KokyakuErrors; // errors プロパティを追加
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
  error,
}: {
  value: string | null;
  onChange: (value: string, index: number) => void;
  index: number;
  placeholder: string;
  isRandom: boolean;
  onRandomChange: (isRandom: boolean, index: number) => void;
  error?: string; 
}) => (
  <Box mb="xs">
    <Flex align="center" justify="space-between" mb={5}>
      <TextInput
        placeholder={placeholder}
        value={isRandom ? '' : value || ''}
        onChange={(e) => onChange(e.target.value, index)}
        disabled={isRandom}
        style={{ flex: 1 }}
        error={error} // error プロパティを TextInput に渡す
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

export const KokyakuForm = ({ kokyaku, onChange, attributes, errors }: KokyakuFormProps) => {
  // errors を受け取る
  // 属性変更ハンドラー
  const handleTargetChange = (value: Attribute | null, index: number) => {
    // nullはそのまま渡す
    onChange('targets', value, index);
  };

  // プレゼント変更ハンドラー
  const handlePresentChange = (value: string | null) => {
    onChange('present', value);
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
    if (!kokyaku.profiles) return true;
    return kokyaku.profiles[index] === null;
  };

  const theme = useMantineTheme();
  // スライダーのスタイル
  const sliderStyles = {
    markLabel: { color: theme.colors.black[5] },
  };

  return (
    <Stack gap="xl">
      <Box>
        <Title order={3} className={styles.blackYellowTitle}>
          画像
        </Title>
        <List>
          <List.Item>
            <Text size="sm" mb="xs">
              未入力の場合はランダムとなります
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm" mb="xs">
              .pngファイルのみ対応しています
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm" mb="xs">
              拡張子は未入力でもファイル出力時に自動で付与されます（入力されていた場合は付与しません）
            </Text>
          </List.Item>
        </List>
        <TextInput
          label="ファイル名"
          placeholder="画像ファイル名を入力してください"
          value={kokyaku.image || ''}
          onChange={(e) => onChange('image', e.target.value === '' ? null : e.target.value)}
        />
      </Box>

      <Box>
        <Title order={3} className={styles.blackYellowTitle}>
          名前
        </Title>
        <Text size="sm" mb="xs">
          未入力の場合はランダムとなります
        </Text>
        <TextInput
          label={`名前 (最大${maxNameCount}文字)`}
          placeholder="名前を入力してください"
          value={modelToView(kokyaku.name, '')}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              onChange('name', null);
            } else {
              onChange('name', value);
            }
          }}
          error={errors.name} // name のエラーメッセージを渡す
        />
      </Box>

      <Box>
        <Flex align="center" justify="space-between" mb={5}>
          <Box>
            <Title order={3} className={styles.blackYellowTitle}>
              インカム
            </Title>
          </Box>
          <Switch
            label="ランダム"
            checked={kokyaku.income === null}
            onChange={(event) =>
              onChange('income', event.currentTarget.checked ? null : initialRankParamter)
            }
          />
        </Flex>
        <Slider
          min={1}
          max={10}
          step={1}
          value={kokyaku.income !== null ? kokyaku.income : initialRankParamter}
          onChange={(value) => onChange('income', value)}
          disabled={kokyaku.income === null}
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
          <Title order={3} className={styles.blackYellowTitle}>
            プレゼント
          </Title>
          <Text size="sm">
            未設定の場合はプレゼント無しになります。ランダムにしたい場合は「ランダム」を選択してください。
          </Text>
          <Text size="sm">
            先天性属性は通常、レアコキャク「曲輪」しかプレゼントしないため、カスタムコキャクがプレゼントするとゲームバランスが変わるので注意。
          </Text>
        </Box>
        <PresentSelector selectedPresent={kokyaku.present} onChange={handlePresentChange} />
      </Box>

      <Box>
        <Box mb="xs">
          <Title order={3} className={styles.blackYellowTitle}>
            ターゲット
          </Title>
          <Text size="sm">
            最大3つ。
            未選択の場合はターゲットなしとなります。ランダムにしたい場合はランダムボタンを選択してください。
            全ての属性をランダムにしたい場合は、ランダムボタンを3つ選択してください。
          </Text>
        </Box>
        <AttributeSelector
          selectedAttributes={(kokyaku.targets || []).filter((attr) => attr !== null)}
          onChange={handleTargetChange}
          attributes={attributes}
        />
      </Box>

      <Box>
        <Box mb="xs">
          <Title order={3} className={styles.blackYellowTitle}>
            プロフィール
          </Title>
          <Text size="sm">最大2行、各行6文字までです。未入力の場合「空欄（なし）」となります</Text>
        </Box>
        <ProfileInput
          value={(kokyaku.profiles || [])[0]}
          onChange={handleProfileChange}
          index={0}
          placeholder="1行目"
          isRandom={isProfileRandom(0)}
          onRandomChange={handleProfileRandomChange}
          error={errors.profiles?.[0]} // profile[0] のエラーメッセージを渡す
        />
        <ProfileInput
          value={(kokyaku.profiles || [])[1]}
          onChange={handleProfileChange}
          index={1}
          placeholder="2行目"
          isRandom={isProfileRandom(1)}
          onRandomChange={handleProfileRandomChange}
          error={errors.profiles?.[1]} // profile[1] のエラーメッセージを渡す
        />
      </Box>
    </Stack>
  );
};
