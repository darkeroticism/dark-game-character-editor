import { Attribute } from './attribute';

/**
 * ドーナドーナのドメイン知識、特に型やデータの定義.
 */
// キャラクタータイプの定義
export type CharacterType = 'ジンザイ' | 'コキャク';

// ランク情報の一元管理
type Rank = {
  name: string;
  description: string;
  value: number;
};

// ルックス、テクニック、メンタル、インカム等、ランク表記の初期値とかスライダーをリセットした時の値とか
// 3 = 一般的
export const initialRankParamter = 3;

export const rankInfo: ReadonlyArray<Rank> = [
  { name: 'S+', description: '神話級', value: 10 },
  { name: 'S', description: '伝説級', value: 9 },
  { name: 'A+', description: '世界級', value: 8 },
  { name: 'A', description: '全国級', value: 7 },
  { name: 'B+', description: 'かなり優秀', value: 6 },
  { name: 'B', description: '優秀', value: 5 },
  { name: 'C+', description: 'やや優秀', value: 4 },
  { name: 'C', description: '一般的', value: 3 },
  { name: 'D+', description: '劣っている', value: 2 },
  { name: 'D', description: '能力が皆無', value: 1 },
] as const;

// ランク値からスライダー値への変換
export const rankToSliderValue = (rank: string | null): number | null => {
  if (!rank) return null;
  const rankObj = rankInfo.find((r) => r.name === rank.substring(0, 2));
  return rankObj ? rankObj.value : null;
};

export const HaruuriFluctuatedParameterInfo = {
  looks: -200,
  technic: 400,
  mental: -800,
} as const;

export const voices: Voice[] = [
  '女子汎用／大／真面目',
  '女子汎用／大／陽気',
  '女子汎用／大／強気',
  '女子汎用／高／真面目',
  '女子汎用／高／活発',
  '女子汎用／高／陽気',
  '女子汎用／高／控え目',
  '女子汎用／高／無邪気',
  '女子汎用／中／真面目',
  '女子汎用／中／活発',
  '女子汎用／中／控え目',
  '女子汎用／小／無邪気',
  '女子汎用／小／勝ち気',
  '女子汎用／小／控え目',
  // 隠し要素: ナユタメンバーやユニークジンザイの音声も使用することができる。
  'キラキラ',
  'ポルノ',
  'メディコ',
  'アンテナ',
  'アリス',
  '菊千代',
  'クマ',
  'ザッパ',
  '虎太郎',
  'ジョーカー',
  'リリヱ',
  '衣縫',
  '恭花',
  '凛',
  'ノエル',
  '心瑠姫',
  '環',
  '千晴',
  'フミ',
  '早奈',
  '菜々実',
  'しゅ子',
] as const;

export type Image = string;
export type Name = string;
export type HaruuriCharacterParameter = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null;
export type Looks = HaruuriCharacterParameter;
export type Techinc = HaruuriCharacterParameter;
export type Mental = HaruuriCharacterParameter;

export type JinzaiAttribute = Attribute | null;
export type JinzaiAttributes = JinzaiAttribute[];
export type IsVergin = boolean;
export type Voice = string;
export type ProfileText = string | null;
export type JinzaiProfileTexts = ProfileText[];
export type Present = string | null;

export type KokyakuProfileTexts = ProfileText[];

export type Jinzai = {
  image: Image | null;
  name: Name | null;
  looks: Looks | null;
  technic: Techinc | null;
  mental: Mental | null;
  attributes: JinzaiAttributes;
  isVergin: IsVergin | null;
  voice: Voice | null;
  profiles: JinzaiProfileTexts;
};

export type Kokyaku = {
  characterType: string;
  image: Image | null;
  name: Name | null;
  income: HaruuriCharacterParameter | null;
  present: Present;
  targets: JinzaiAttributes;
  profiles: KokyakuProfileTexts;
};
