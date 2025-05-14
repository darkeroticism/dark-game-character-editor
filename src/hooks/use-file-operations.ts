import { readFileAsShiftJIS } from '../utils/shift-jis-decoder';
import { downloadWithShiftJIS } from '../utils/shift-jis-encoder';
import { getFileName } from '../utils/file-name-utils';
import { validateJinzai, validateKokyaku } from '../utils/validation-utils';
import {
  parseJinzaiFromText,
  parseKokyakuFromText,
  detectCharacterTypeFromText,
} from '../dohna-dohna/txt-to-state-converter';
import {
  generateJinzaiIniContent,
  generateKokyakuIniContent,
} from '../dohna-dohna/state-to-txt-converter';
import { CharacterType, Jinzai, Kokyaku } from '../dohna-dohna/data';
import { JinzaiErrors, KokyakuErrors } from './use-character-state';
import { showErrorNotification, showParseErrorNotification, showSuccessNotification } from '../utils/notification-utils';

type UseFileOperationsProps = {
  characterType: CharacterType;
  setCharacterType: (type: CharacterType) => void;
  jinzai: Jinzai;
  setJinzai: (jinzai: Jinzai) => void;
  kokyaku: Kokyaku;
  setKokyaku: (kokyaku: Kokyaku) => void;
  setJinzaiErrors: (errors: JinzaiErrors) => void;
  setKokyakuErrors: (errors: KokyakuErrors) => void;
  resetJinzai: () => void;
  resetKokyaku: () => void;
};

export function useFileOperations({
  characterType,
  setCharacterType,
  jinzai,
  setJinzai,
  kokyaku,
  setKokyaku,
  setJinzaiErrors,
  setKokyakuErrors,
  resetJinzai,
  resetKokyaku,
}: UseFileOperationsProps) {
  // ファイルがドロップされたときの処理
  const handleFileDrop = async (file: File): Promise<{ success: boolean; message?: string; unparseableParams?: string[] }> => {
    try {
      // 既存の状態をリセット
      if (characterType === 'ジンザイ') {
        resetJinzai();
      } else {
        resetKokyaku();
      }

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
        if (parsedJinzai.voice === null) unparseableParams.push('音声');
        if (parsedJinzai.image === null) unparseableParams.push('画像');
        if (parsedJinzai.attributes.every((attr) => attr === null)) unparseableParams.push('属性');

        // 解析できなかったパラメータがある場合は注意ウィンドウを表示
        if (unparseableParams.length > 0) {
          showParseErrorNotification(unparseableParams);
          // ステートを更新
          setJinzai(parsedJinzai);
          // エラーをリセット
          setJinzaiErrors({});
          return { success: false, unparseableParams };
        } else {
          showSuccessNotification(file.name);
          // ステートを更新
          setJinzai(parsedJinzai);
          // エラーをリセット
          setJinzaiErrors({});
          return { success: true };
        }
      } else {
        const parsedKokyaku = parseKokyakuFromText(content);

        // 解析できなかったパラメータがあるか確認
        const unparseableParams: string[] = [];
        if (parsedKokyaku.name === null) unparseableParams.push('名前');
        if (parsedKokyaku.income === null) unparseableParams.push('インカム');
        if (parsedKokyaku.present === null) unparseableParams.push('プレゼント');
        if (parsedKokyaku.image === null) unparseableParams.push('画像');
        if (parsedKokyaku.targets.every((target) => target === null))
          unparseableParams.push('ターゲット');

        // 解析できなかったパラメータがある場合は注意ウィンドウを表示
        if (unparseableParams.length > 0) {
          showParseErrorNotification(unparseableParams);
          // ステートを更新
          setKokyaku(parsedKokyaku);
          // エラーをリセット
          setKokyakuErrors({});
          return { success: false, unparseableParams };
        } else {
          showSuccessNotification(file.name);
          // ステートを更新
          setKokyaku(parsedKokyaku);
          // エラーをリセット
          setKokyakuErrors({});
          return { success: true };
        }
      }
    } catch (error) {
      console.error('ファイル読み込みエラー:', error);
      showErrorNotification(error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'ファイルの読み込みに失敗しました' 
      };
    }
  };

  // バリデーションを実行し、エラーがあればエラーstateを更新する関数
  const validateForm = (): boolean => {
    if (characterType === 'ジンザイ') {
      const errors = validateJinzai(jinzai);
      setJinzaiErrors(errors);
      setKokyakuErrors({}); // コキャクのエラーはクリア
      
      const isValid = !errors.name && !errors.profiles?.some((profile: string | undefined) => profile !== undefined);
      return isValid;
    } else {
      const errors = validateKokyaku(kokyaku);
      setKokyakuErrors(errors);
      setJinzaiErrors({}); // ジンザイのエラーはクリア
      
      const isValid = !errors.name && !errors.profiles?.some((profile: string | undefined) => profile !== undefined);
      return isValid;
    }
  };

  // INIファイル形式のコンテンツを生成
  const generateIniContent = (): string => {
    return characterType === 'ジンザイ'
      ? generateJinzaiIniContent(jinzai)
      : generateKokyakuIniContent(kokyaku);
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

  return {
    handleFileDrop,
    validateForm,
    handleGenerateFile,
  };
}
