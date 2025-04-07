import { useState } from 'react';
import {
  Jinzai,
  Kokyaku,
  randomText,
  nullText,
  attributes,
  rankWithDescription,
  voices,
  CharacterType,
} from '../DohnaDohna/data';
import { downloadWithShiftJIS } from '../utils/shiftJisEncoder';
import { JinzaiForm } from './JinzaiForm';
import { KokyakuForm } from './KokyakuForm';
import { generateJinzaiIniContent, generateKokyakuIniContent } from '../DohnaDohna/logic';
import { Container, Title, SegmentedControl, Button, Paper } from '@mantine/core';

// ジンザイの初期状態を作成する関数
const getInitialJinzai = (): Jinzai => ({
  image: '',
  name: null,
  looks: null,
  technic: null,
  mental: null,
  attributes: [nullText, nullText, nullText],
  isVergin: null,
  voice: null,
  profile: ['', '', ''],
});

// コキャクの初期状態を作成する関数
const getInitialKokyaku = (): Kokyaku => ({
  characterType: 'コキャク',
  image: '',
  name: '',
  income: null,
  present: [''],
  target: [nullText, nullText, nullText],
  profile: ['', ''],
});

// 値がnullになるべきかを判定する関数
const shouldBeNull = (value: string | boolean | null): boolean =>
  value === null || (typeof value === 'string' && (value === nullText || value === randomText || value === ''));

// 配列フィールドを更新する関数
const updateArrayField = <T,>(array: T[], index: number, value: T): T[] => {
  const newArray = [...array];
  newArray[index] = value;
  return newArray;
};

// プレゼント配列を更新する関数（最後の要素に入力があれば新しい入力欄を追加）
const updatePresentArray = (presents: string[], index: number, value: string): string[] => {
  const newPresents = [...presents];

  // 最後のフィールドに入力があり、新しい入力欄が必要な場合
  if (index === presents.length - 1 && value !== '') {
    newPresents[index] = value;
    newPresents.push('');
  } else {
    newPresents[index] = value;
  }

  return newPresents;
};

// キャラクタータイプセレクターコンポーネント
const CharacterTypeSelector = ({
  characterType,
  onChange,
}: {
  characterType: CharacterType;
  onChange: (type: CharacterType) => void;
}) => (
  <SegmentedControl
    value={characterType}
    onChange={onChange as (value: string) => void}
    data={[
      { label: 'ジンザイ', value: 'ジンザイ' },
      { label: 'コキャク', value: 'コキャク' },
    ]}
    fullWidth
    mb="md"
  />
);

// ファイル生成ボタンコンポーネント
const GenerateFileButton = ({ onClick }: { onClick: () => void }) => (
  <div style={{ textAlign: 'center', marginTop: 30 }}>
    <Button onClick={onClick} size="lg" color="green">
      .txtファイルを生成してダウンロード
    </Button>
  </div>
);

export const CharacterEditor = () => {
  // キャラクタータイプの状態
  const [characterType, setCharacterType] = useState<CharacterType>('ジンザイ');

  // ジンザイの初期状態
  const [jinzai, setJinzai] = useState<Jinzai>(getInitialJinzai());

  // コキャクの初期状態
  const [kokyaku, setKokyaku] = useState<Kokyaku>(getInitialKokyaku());

  // ジンザイのフィールド更新ハンドラー
  const handleJinzaiChange = (field: keyof Jinzai, value: string | boolean | null, index?: number) => {
    setJinzai((prev) => {
      const updated = { ...prev };

      if (field === 'attributes' && typeof index === 'number') {
        updated.attributes = updateArrayField(prev.attributes, index, value as string);
      } else if (field === 'profile' && typeof index === 'number') {
        updated.profile = updateArrayField(prev.profile, index, value as string);
      } else {
        // @ts-expect-error - 動的なフィールド更新
        updated[field] = shouldBeNull(value) ? null : value;
      }

      return updated;
    });
  };

  // コキャクのフィールド更新ハンドラー
  const handleKokyakuChange = (field: keyof Kokyaku, value: string, index?: number) => {
    setKokyaku((prev) => {
      const updated = { ...prev };

      if (field === 'target' && typeof index === 'number') {
        updated.target = updateArrayField(prev.target, index, value);
      } else if (field === 'present' && typeof index === 'number') {
        updated.present = updatePresentArray(prev.present, index, value);
      } else if (field === 'profile' && typeof index === 'number') {
        const newProfile = [...(prev.profile as string[])];
        newProfile[index] = value;
        updated.profile = newProfile;
      } else {
        // @ts-expect-error - 動的なフィールド更新
        updated[field] = shouldBeNull(value) ? null : value;
      }

      return updated;
    });
  };

  // INIファイル形式のコンテンツを生成
  const generateIniContent = (): string => {
    return characterType === 'ジンザイ'
      ? generateJinzaiIniContent(jinzai)
      : generateKokyakuIniContent(kokyaku);
  };

  // ファイル生成とダウンロード処理
  const handleGenerateFile = () => {
    const filename =
      characterType === 'ジンザイ'
        ? `${jinzai.name || 'jinzai'}.txt`
        : `${kokyaku.name || 'kokyaku'}.txt`;

    const content = generateIniContent();
    downloadWithShiftJIS(filename, content);
  };

  // 現在のキャラクタータイプに基づいてフォームを表示
  const renderCharacterForm = () => {
    return characterType === 'ジンザイ' ? (
      <JinzaiForm
        jinzai={jinzai}
        onChange={handleJinzaiChange}
        attributes={attributes}
        rankNames={rankWithDescription}
        voices={voices}
        undefinedRandomText={randomText}
      />
    ) : (
      <KokyakuForm
        kokyaku={kokyaku}
        onChange={handleKokyakuChange}
        attributes={attributes}
        rankNames={rankWithDescription}
        undefinedRandomText={randomText}
      />
    );
  };

  return (
    <Container size="md" py="xl">
      <Title order={1} ta="center" mb="lg">
        ドーナドーナ キャラクターエディター
      </Title>

      <CharacterTypeSelector characterType={characterType} onChange={setCharacterType} />

      <Paper p="md" shadow="xs" radius="md">
        {renderCharacterForm()}
      </Paper>

      <GenerateFileButton onClick={handleGenerateFile} />
    </Container>
  );
};
