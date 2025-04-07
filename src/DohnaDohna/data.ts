/**
 * ドーナドーナのドメイン知識、特に型やデータの定義.
 */
// キャラクタータイプの定義
export type CharacterType = 'ジンザイ' | 'コキャク';
export const randomText = 'ランダム（未設定）';
export const nullText = 'なし（空欄）';

export const attributes: string[] = [
  nullText,
  randomText,
  '巨乳',
  '貧乳',
  '安産型',
  '脚線美',
  '玉の肌',
  '筋肉質',
  '着やせ',
  '名器',
  '外傷',
  '骨折',
  '車椅子',
  '低血圧',
  '病弱',
  '失明',
  'タトゥ',
  'ピアス',
  '敏感',
  '体臭',
  '令嬢',
  '有名人',
  '委員長',
  '優等生',
  '運動部',
  '補導歴',
  '生活難',
  '彼氏有',
  '彼女有',
  '既婚',
  '経産婦',
  '人気者',
  '王子様',
  '愛嬌',
  'クール',
  '無口',
  '強情',
  '前向き',
  '一途',
  '照れ屋',
  '臆病',
  '従順',
  '正義感',
  '真面目',
  '小悪魔',
  '高飛車',
  '潔癖',
  '無垢',
  'えっち',
  '変態',
  '癒し系',
  'ゆるい',
  '不思議',
  '心の闇',
  '自虐的',
  'サイコ',
  '上品',
  '家庭的',
  '魔性',
  // マニュアルに記載されていない隠し属性
  '二形',
  '男の娘',
  '泥中蓮',
  '無双',
  '無相',
  '無想',
];

export const rankWithDescription = [
  randomText,
  'S+ (神話級)',
  'S (伝説級)',
  'A+ (世界級)',
  'A (全国級)',
  'B+ (かなり優秀)',
  'B (優秀)',
  'C+ (やや優秀)',
  'C (一般的)',
  'D+ (劣っている)',
  'D (能力が皆無)',
] as const;
type RankNameWithDescription = (typeof rankWithDescription)[number];

// スライダー用のランク定義
export const rankValues = [
  { value: 'S+', label: 'S+ (神話級)', sliderValue: 10 },
  { value: 'S', label: 'S (伝説級)', sliderValue: 9 },
  { value: 'A+', label: 'A+ (世界級)', sliderValue: 8 },
  { value: 'A', label: 'A (全国級)', sliderValue: 7 },
  { value: 'B+', label: 'B+ (かなり優秀)', sliderValue: 6 },
  { value: 'B', label: 'B (優秀)', sliderValue: 5 },
  { value: 'C+', label: 'C+ (やや優秀)', sliderValue: 4 },
  { value: 'C', label: 'C (一般的)', sliderValue: 3 },
  { value: 'D+', label: 'D+ (劣っている)', sliderValue: 2 },
  { value: 'D', label: 'D (能力が皆無)', sliderValue: 1 },
] as const;

// スライダー値からランク値への変換
export const sliderValueToRank = (value: number): string => {
  const rank = rankValues.find((r) => r.sliderValue === value);
  return rank ? rank.value : '';
};

// ランク値からスライダー値への変換
export const rankToSliderValue = (rank: string | null): number | null => {
  if (!rank || rank === randomText) return null;
  const rankObj = rankValues.find((r) => r.value === rank.substring(0, 2));
  return rankObj ? rankObj.sliderValue : null;
};

export const voices: Voice[] = [
  randomText,
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
export type Looks = RankNameWithDescription;
export type Techinc = RankNameWithDescription;
export type Mental = RankNameWithDescription;
export type JinzaiAttribute = string;
export type JinzaiAttributes = JinzaiAttribute[];
export type IsVergin = boolean;
export type Voice = string;
export type ProfileText = string;
export type JinzaiProfileTexts = ProfileText[];
export type Present = string;
export type Presents = Present[];

export type KokyakuProfileTexts = ProfileText[] | string;

export type Jinzai = {
  image: Image;
  name: Name | null;
  looks: Looks | null;
  technic: Techinc | null;
  mental: Mental | null;
  attributes: JinzaiAttributes;
  isVergin: IsVergin | null;
  voice: Voice | null;
  profile: JinzaiProfileTexts;
};

export type Kokyaku = {
  characterType: string;
  image: Image;
  name: Name;
  income: RankNameWithDescription | null;
  present: Presents;
  target: JinzaiAttributes;
  profile: KokyakuProfileTexts | null;
};
