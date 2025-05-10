import { useState } from 'react';
import { Jinzai, Kokyaku, voices, CharacterType, initialRankParamter } from '../DohnaDohna/data';
import { Attribute, attributes } from '../DohnaDohna/attribute';
import { downloadWithShiftJIS } from '../utils/shiftJisEncoder';
import { JinzaiForm } from './JinzaiForm';
import { KokyakuForm } from './KokyakuForm';
import {
  generateJinzaiIniContent,
  generateKokyakuIniContent,
} from '../DohnaDohna/StateToTxtConverter';
import { Container } from '@mantine/core';
import { CharacterTypeSelector } from './CharacterTypeSelector';
import { GenerateFileButton } from './GenerateFileButton';
import { getFileName } from '../utils/FileNameUtils';
import { validateJinzai, validateKokyaku } from '../utils/ValidationUtils';
import { updateArrayField } from '../utils/ArrayUtils';

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

  // バリデーションを実行し、エラーがあればエラーstateを更新する関数
  const validateForm = (): boolean => {
    if (characterType === 'ジンザイ') {
      const errors = validateJinzai(jinzai);
      setJinzaiErrors(errors);
      setKokyakuErrors({}); // コキャクのエラーはクリア
      return !errors.name && !errors.profiles?.some((err) => err !== undefined);
    } else {
      const errors = validateKokyaku(kokyaku);
      setKokyakuErrors(errors);
      setJinzaiErrors({}); // ジンザイのエラーはクリア
      return !errors.name && !errors.profiles?.some((err) => err !== undefined);
    }
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
        errors={jinzaiErrors}
      />
    ) : (
      <KokyakuForm
        kokyaku={kokyaku}
        onChange={handleKokyakuChange}
        attributes={attributes}
        errors={kokyakuErrors}
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
