import { useState } from 'react';
import { Jinzai, Kokyaku, CharacterType, initialRankParamter } from '../dohna-dohna/data';
import { Attribute } from '../dohna-dohna/attribute';
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

export function useCharacterState() {
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

  // 状態をリセットする関数
  const resetJinzai = () => {
    setJinzai(getInitialJinzai());
    setJinzaiErrors({});
  };

  const resetKokyaku = () => {
    setKokyaku(getInitialKokyaku());
    setKokyakuErrors({});
  };

  return {
    characterType,
    setCharacterType,
    jinzai,
    setJinzai,
    kokyaku,
    setKokyaku,
    jinzaiErrors,
    setJinzaiErrors,
    kokyakuErrors,
    setKokyakuErrors,
    handleJinzaiChange,
    handleKokyakuChange,
    resetJinzai,
    resetKokyaku,
    getInitialJinzai,
    getInitialKokyaku
  };
}
