import {
  Jinzai,
  Kokyaku,
  maxNameCount,
  maxProfileLineLengthForJinzai,
  maxProfileLineLengthForKokyaku,
} from '../dohna-dohna/data';
import { JinzaiErrors, KokyakuErrors } from '../components/character-editor';

// 名前の長さをバリデーションする関数
export const validateName = (name: string | null): boolean => {
  if (name === null) return true; // nullの場合はランダム生成なので問題なし
  return name.length <= maxNameCount;
};

// プロフィール行の長さをバリデーションする関数
export const validateProfileLine = (line: string | null, maxProfileLineLength: number): boolean => {
  if (line === null) return true; // nullは許容 (ランダムまたは空欄)
  return line.length <= maxProfileLineLength;
};

// ジンザイのバリデーションを実行する関数
export const validateJinzai = (jinzai: Jinzai): JinzaiErrors => {
  const errors: JinzaiErrors = { profiles: [] };

  // 名前のバリデーション
  if (!validateName(jinzai.name)) {
    errors.name = `名前は${maxNameCount}文字以内で入力してください`;
  }

  // プロフィールのバリデーション
  const profileErrors: (string | undefined)[] = [];
  for (let i = 0; i < jinzai.profiles.length; i++) {
    if (!validateProfileLine(jinzai.profiles[i], maxProfileLineLengthForJinzai)) {
      profileErrors[i] =
        `プロフィールの${i + 1}行目は${maxProfileLineLengthForJinzai}文字以内で入力してください`;
    } else {
      profileErrors[i] = undefined;
    }
  }

  if (profileErrors.some((err) => err !== undefined)) {
    errors.profiles = profileErrors;
  }

  return errors;
};

// コキャクのバリデーションを実行する関数
export const validateKokyaku = (kokyaku: Kokyaku): KokyakuErrors => {
  const errors: KokyakuErrors = { profiles: [] };

  // 名前のバリデーション
  if (!validateName(kokyaku.name)) {
    errors.name = `名前は${maxNameCount}文字以内で入力してください`;
  }

  // プロフィールのバリデーション
  const profileErrors: (string | undefined)[] = [];
  for (let i = 0; i < (kokyaku.profiles || []).length; i++) {
    if (!validateProfileLine((kokyaku.profiles || [])[i], maxProfileLineLengthForKokyaku)) {
      profileErrors[i] =
        `プロフィールの${i + 1}行目は${maxProfileLineLengthForKokyaku}文字以内で入力してください`;
    } else {
      profileErrors[i] = undefined;
    }
  }

  if (profileErrors.some((err) => err !== undefined)) {
    errors.profiles = profileErrors;
  }

  return errors;
};
