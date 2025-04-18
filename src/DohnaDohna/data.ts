/**
 * ドーナドーナのドメイン知識、特に型やデータの定義.
 */
// キャラクタータイプの定義
export type CharacterType = 'ジンザイ' | 'コキャク';

export type Attribute = {
  name: string;
  congenital: boolean;
  isSecret: boolean;
  basicLooks: number;
  basicTechnic: number;
  basicMental: number;
  fluctuatedLooks: number;
  fluctuatedTechnic: number;
  fluctuatedMental: number;
};
export const attributes: Attribute[] = [
  { name: '巨乳', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '貧乳', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '安産型', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '脚線美', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '玉の肌', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '筋肉質', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '着やせ', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '名器', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '外傷', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '骨折', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '車椅子', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '低血圧', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '病弱', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '失明', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: 'タトゥ', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: 'ピアス', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '敏感', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '体臭', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '令嬢', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '有名人', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '委員長', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '優等生', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '運動部', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '補導歴', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '生活難', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '彼氏有', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '彼女有', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '既婚', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '経産婦', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '人気者', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '王子様', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '愛嬌', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: 'クール', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '無口', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '強情', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '前向き', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '一途', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '照れ屋', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '臆病', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '従順', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '正義感', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '真面目', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '小悪魔', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '高飛車', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '潔癖', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '無垢', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: 'えっち', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '変態', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '癒し系', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: 'ゆるい', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '不思議', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '心の闇', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '自虐的', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: 'サイコ', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '上品', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '家庭的', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '魔性', congenital: false, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  // マニュアルに記載されていない隠し属性
  { name: '二形', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '男の娘', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '泥中蓮', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '無双', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '無相', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
  { name: '無想', congenital: true, isSecret: false, basicLooks: 0, basicTechnic: 0, basicMental: 0, fluctuatedLooks: 0, fluctuatedTechnic: 0, fluctuatedMental: 0 },
] as const;

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
