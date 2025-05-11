import { useState } from 'react';
import { Jinzai, Kokyaku, voices, CharacterType, initialRankParamter } from '../dohna-dohna/data';
import { Attribute, attributes } from '../dohna-dohna/attribute';
import { downloadWithShiftJIS } from '../utils/shift-jis-encoder';
import { readFileAsShiftJIS } from '../utils/shift-jis-decoder';
import {
  parseJinzaiFromText,
  parseKokyakuFromText,
  detectCharacterTypeFromText,
} from '../dohna-dohna/txt-to-state-converter';
import { JinzaiForm } from './jinzai-form';
import { KokyakuForm } from './kokyaku-form';
import {
  generateJinzaiIniContent,
  generateKokyakuIniContent,
} from '../dohna-dohna/state-to-txt-converter';
import { Container } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FileDropZone } from './file-drop-zone';
import { CharacterTypeSelector } from './character-type-selector';
import { GenerateFileButton } from './generate-file-button';
import { getFileName } from '../utils/file-name-utils';
import { validateJinzai, validateKokyaku } from '../utils/validation-utils';
import { updateArrayField } from '../utils/array-utils';

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

  // ファイルがドロップされたときの処理
  const handleFileDrop = async (file: File) => {
    try {
      // Shift-JISエンコードされたファイルを読み込む
      const content = await readFileAsShiftJIS(file);

      // キャラクタータイプを判定
      const detectedType = detectCharacterTypeFromText(content);
      setCharacterType(detectedType);

      // キャラクタータイプに応じてパース処理を実行
      if (detectedType === 'ジンザイ') {
        const parsedJinzai = parseJinzaiFromText(content);

        // 解析できなかったパラメータがあるか確認
        const unparseableParams: string[] = [];
        if (parsedJinzai.name === null) unparseableParams.push('名前');
        if (parsedJinzai.looks === null) unparseableParams.push('ルックス');
        if (parsedJinzai.technic === null) unparseableParams.push('テクニック');
        if (parsedJinzai.mental === null) unparseableParams.push('メンタル');
        if (parsedJinzai.isVergin === null) unparseableParams.push('処女');

        // 解析できなかったパラメータがある場合は注意ウィンドウを表示
        if (unparseableParams.length > 0) {
          notifications.show({
            title: '一部のパラメータを解析できませんでした',
            message: `以下のパラメータは解析できなかったため、デフォルト値または空欄になっています: ${unparseableParams.join(', ')}`,
            color: 'yellow',
          });
        } else {
          notifications.show({
            title: 'ファイルを読み込みました',
            message: `${file.name}を正常に読み込みました`,
            color: 'green',
          });
        }

        // ステートを更新
        setJinzai(parsedJinzai);
      } else {
        const parsedKokyaku = parseKokyakuFromText(content);

        // 解析できなかったパラメータがあるか確認
        const unparseableParams: string[] = [];
        if (parsedKokyaku.name === null) unparseableParams.push('名前');
        if (parsedKokyaku.income === null) unparseableParams.push('インカム');

        // 解析できなかったパラメータがある場合は注意ウィンドウを表示
        if (unparseableParams.length > 0) {
          notifications.show({
            title: '一部のパラメータを解析できませんでした',
            message: `以下のパラメータは解析できなかったため、デフォルト値または空欄になっています: ${unparseableParams.join(', ')}`,
            color: 'yellow',
          });
        } else {
          notifications.show({
            title: 'ファイルを読み込みました',
            message: `${file.name}を正常に読み込みました`,
            color: 'green',
          });
        }

        // ステートを更新
        setKokyaku(parsedKokyaku);
      }
    } catch (error) {
      console.error('ファイル読み込みエラー:', error);
      notifications.show({
        title: 'ファイル読み込みエラー',
        message:
          'ファイルの読み込みに失敗しました。正しいShift-JISエンコードのテキストファイルか確認してください。',
        color: 'red',
      });
    }
  };

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
      return !errors.name && !errors.profiles?.some((profile) => profile !== undefined);
    } else {
      const errors = validateKokyaku(kokyaku);
      setKokyakuErrors(errors);
      setJinzaiErrors({}); // ジンザイのエラーはクリア
      return !errors.name && !errors.profiles?.some((profile) => profile !== undefined);
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

      <FileDropZone onFileDrop={handleFileDrop} />

      <Container p="md">{renderCharacterForm()}</Container>

      <GenerateFileButton onClick={handleGenerateFile} />
    </Container>
  );
};
