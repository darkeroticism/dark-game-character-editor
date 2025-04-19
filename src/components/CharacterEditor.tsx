import { useState } from 'react';
import {
  Jinzai,
  Kokyaku,
  voices,
  CharacterType,
  initialRankParamter,
} from '../DohnaDohna/data';
import { Attribute, attributes } from '../DohnaDohna/Attribute';
import { downloadWithShiftJIS } from '../utils/shiftJisEncoder';
import { JinzaiForm } from './JinzaiForm';
import { KokyakuForm } from './KokyakuForm';
import {
  generateJinzaiIniContent,
  generateKokyakuIniContent,
} from '../DohnaDohna/StateToTxtConverter';
import { Container, SegmentedControl, Button } from '@mantine/core';
import styles from '../styles/ParallelogramButton.module.css';

// ジンザイの初期状態を作成する関数

const getInitialJinzai = (): Jinzai => ({
  image: null,
  name: null,
  looks: initialRankParamter,
  technic: initialRankParamter,
  mental: initialRankParamter,
  attributes: [null, null, null],
  isVergin: null,
  voice: null,
  profiles: ['', '', ''],
});

// コキャクの初期状態を作成する関数
const getInitialKokyaku = (): Kokyaku => ({
  characterType: 'コキャク',
  image: null,
  name: null,
  income: initialRankParamter,
  present: null,
  targets: [null, null, null],
  profiles: ['', ''],
});

// 配列フィールドを更新する関数
const updateArrayField = <T,>(array: T[], index: number, value: T): T[] => {
  const newArray = [...array];
  newArray[index] = value;
  return newArray;
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
    <Container>
      <div className={styles.parallelogramButton}>
        <Button onClick={onClick} size="lg" style={{ background: 'transparent', border: 'none' }}>
          .txtファイルを生成してダウンロード
        </Button>
      </div>
    </Container>
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
  const handleJinzaiChange = (
    field: keyof Jinzai,
    value: string | boolean | null | number | Attribute,
    index?: number
  ) => {
    setJinzai((prev) => {
      const updated = { ...prev };

      if (field === 'attributes' && typeof index === 'number') {
        updated.attributes = updateArrayField(prev.attributes, index, value as Attribute);
      } else if (field === 'profiles' && typeof index === 'number') {
        updated.profiles = updateArrayField(prev.profiles, index, value as string);
      } else {
        // @ts-expect-error - 動的なフィールド更新
        updated[field] = value;
      }

      return updated;
    });
  };

  // コキャクのフィールド更新ハンドラー
  const handleKokyakuChange = (
    field: keyof Kokyaku,
    value: string | number | null | Attribute,
    index?: number
  ) => {
    setKokyaku((prev) => {
      const updated = { ...prev };

      if (field === 'targets' && typeof index === 'number') {
        updated.targets = updateArrayField(prev.targets, index, value as Attribute | null);
      } else if (field === 'profiles' && typeof index === 'number') {
        const newProfile = [...(prev.profiles || [])];
        newProfile[index] = value as string | null;
        updated.profiles = newProfile;
      } else {
        // @ts-expect-error - 動的なフィールド更新
        updated[field] = value;
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
        voices={voices}
      />
    ) : (
      <KokyakuForm kokyaku={kokyaku} onChange={handleKokyakuChange} attributes={attributes} />
    );
  };

  return (
    <Container size="md" py="xl">
      <CharacterTypeSelector characterType={characterType} onChange={setCharacterType} />

      <Container p="md">{renderCharacterForm()}</Container>

      <GenerateFileButton onClick={handleGenerateFile} />
    </Container>
  );
};
