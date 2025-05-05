import { useState } from 'react';
import {
  Jinzai,
  Kokyaku,
  voices,
  CharacterType,
  initialRankParamter,
  maxNameCount,
  maxProfileLineLengthForKokyaku,
  maxProfileLineLengthForJinzai,
} from '../DohnaDohna/data';
import { Attribute, attributes } from '../DohnaDohna/attribute';
import { downloadWithShiftJIS } from '../utils/shiftJisEncoder';
import { JinzaiForm } from './JinzaiForm';
import { KokyakuForm } from './KokyakuForm';
import {
  generateJinzaiIniContent,
  generateKokyakuIniContent,
} from '../DohnaDohna/StateToTxtConverter';
import { Container, SegmentedControl, Button } from '@mantine/core';
import styles from '../styles/ParallelogramButton.module.css';

export type JinzaiErrors = {
  name?: string;
  profiles?: (string | undefined)[];
};
export type KokyakuErrors = {
  name?: string;
  profiles?: (string | undefined)[];
};

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

const getFileName = (type: CharacterType, name: string | null): string => {
  switch (type) {
    case 'ジンザイ':
      return name ? `ジンザイ-${name}.txt` : 'ジンザイ.txt';
    case 'コキャク':
      return name ? `コキャク-${name}.txt` : 'コキャク.txt';
    default:
      // exhaustive check
      // @link https://zenn.dev/qnighy/articles/462baa685c80e2
      throw new Error(`Unknown type: ${(type as { type: '__invalid__' }).type}`);
  }
};

export const CharacterEditor = () => {
  // キャラクタータイプの状態
  const [characterType, setCharacterType] = useState<CharacterType>('ジンザイ');

  // ジンザイの初期状態
  const [jinzai, setJinzai] = useState<Jinzai>(getInitialJinzai());

  // コキャクの初期状態
  const [kokyaku, setKokyaku] = useState<Kokyaku>(getInitialKokyaku());

  // エラーメッセージの状態
  const [jinzaiErrors, setJinzaiErrors] = useState<JinzaiErrors>({});
  const [kokyakuErrors, setKokyakuErrors] = useState<KokyakuErrors>({});

  // ジンザイのフィールド更新ハンドラー
  const handleJinzaiChange = (
    field: keyof Jinzai,
    value: string | boolean | null | number | Attribute,
    index?: number
  ) => {
    // エラーをクリア
    if (field === 'name' && jinzaiErrors.name) {
      setJinzaiErrors((prev) => ({ ...prev, name: undefined }));
    }

    if (field === 'profiles' && typeof index === 'number' && jinzaiErrors.profiles?.[index]) {
      setJinzaiErrors((prev) => {
        const newProfileErrors = [...(prev.profiles || [])];
        newProfileErrors[index] = undefined;
        return { ...prev, profiles: newProfileErrors };
      });
    }

    setJinzai((prev) => {
      const updated = { ...prev };

      if (field === 'attributes' && typeof index === 'number') {
        updated.attributes = updateArrayField(prev.attributes, index, value as Attribute);
      } else if (field === 'profiles' && typeof index === 'number') {
        // プロフィール更新ロジックを修正
        const newProfile = [...prev.profiles];
        newProfile[index] = value as string | null;
        updated.profiles = newProfile;
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
    // エラーをクリア
    if (field === 'name' && kokyakuErrors.name) {
      setKokyakuErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (field === 'profiles' && typeof index === 'number' && kokyakuErrors.profiles?.[index]) {
      setKokyakuErrors((prev) => {
        const newProfileErrors = [...(prev.profiles || [])];
        newProfileErrors[index] = undefined;
        return { ...prev, profiles: newProfileErrors };
      });
    }

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

  // 名前の長さをバリデーションする関数
  const validateName = (name: string | null): boolean => {
    if (name === null) return true; // nullの場合はランダム生成なので問題なし
    return name.length <= maxNameCount;
  };

  // プロフィール行の長さをバリデーションする関数
  const validateProfileLine = (line: string | null, maxProfileLineLength: number): boolean => {
    if (line === null) return true; // nullは許容 (ランダムまたは空欄)
    return line.length <= maxProfileLineLength;
  };

  // バリデーションを実行し、エラーがあればエラーstateを更新する関数
  const validateForm = (): boolean => {
    let isValid = true;
    const newJinzaiErrors: JinzaiErrors = { profiles: [] }; // profiles を初期化
    const newKokyakuErrors: KokyakuErrors = { profiles: [] };

    if (characterType === 'ジンザイ') {
      // ジンザイの名前バリデーション
      if (!validateName(jinzai.name)) {
        newJinzaiErrors.name = `名前は${maxNameCount}文字以内で入力してください`;
        isValid = false;
      }
      // ジンザイのプロフィールバリデーション
      const jinzaiProfileErrors: (string | undefined)[] = [];
      for (let i = 0; i < jinzai.profiles.length; i++) {
        if (!validateProfileLine(jinzai.profiles[i], maxProfileLineLengthForJinzai)) {
          jinzaiProfileErrors[i] =
            `プロフィールの${i + 1}行目は${maxProfileLineLengthForJinzai}文字以内で入力してください`;
          isValid = false;
        } else {
          jinzaiProfileErrors[i] = undefined;
        }
      }
      if (jinzaiProfileErrors.some((err) => err !== undefined)) {
        newJinzaiErrors.profiles = jinzaiProfileErrors;
      }

      setJinzaiErrors(newJinzaiErrors);
      setKokyakuErrors({}); // コキャクのエラーはクリア
    } else {
      // コキャクの名前バリデーション
      if (!validateName(kokyaku.name)) {
        newKokyakuErrors.name = `名前は${maxNameCount}文字以内で入力してください`;
        isValid = false;
      }
      // コキャクのプロフィールバリデーション
      const profileErrors: (string | undefined)[] = [];
      for (let i = 0; i < kokyaku.profiles.length; i++) {
        if (!validateProfileLine(kokyaku.profiles[i], maxProfileLineLengthForKokyaku)) {
          profileErrors[i] =
            `プロフィールの${i + 1}行目は${maxProfileLineLengthForKokyaku}文字以内で入力してください`;
          isValid = false;
        } else {
          profileErrors[i] = undefined;
        }
      }
      if (profileErrors.some((err) => err !== undefined)) {
        newKokyakuErrors.profiles = profileErrors;
      }
      setKokyakuErrors(newKokyakuErrors);
      setJinzaiErrors({}); // ジンザイのエラーはクリア
    }

    return isValid;
  };

  // ファイル生成とダウンロード処理
  const handleGenerateFile = () => {
    if (!validateForm()) {
      return; // バリデーションエラーがあれば処理を中断
    }

    const name = characterType === 'ジンザイ' ? jinzai.name : kokyaku.name;
    const fileName = getFileName(characterType, name);

    const content = generateIniContent();
    downloadWithShiftJIS(fileName, content);
  };

  // 現在のキャラクタータイプに基づいてフォームを表示
  const renderCharacterForm = () => {
    return characterType === 'ジンザイ' ? (
      <JinzaiForm
        jinzai={jinzai}
        onChange={handleJinzaiChange}
        attributes={attributes}
        voices={voices}
        errors={jinzaiErrors} // errors props を渡す
      />
    ) : (
      <KokyakuForm
        kokyaku={kokyaku}
        onChange={handleKokyakuChange}
        attributes={attributes}
        errors={kokyakuErrors} // errors props を渡す
      />
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
