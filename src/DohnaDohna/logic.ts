import { Jinzai, Kokyaku, nullText } from './data';

// ランク値からINI用の文字列を生成する関数
const formatRankValue = (value: string | null): string => {
  return value ? `=${value.substring(0, 2)}` : '=';
};

// 属性配列からINI用の文字列を生成する関数
const formatAttributeRows = (
  attributes: string[],
  fieldName: string,
  undefinedValue: string
): string => {
  return attributes.every((attr) => attr === undefinedValue)
    ? Array(3).fill(`${fieldName}=`).join('\n')
    : attributes
        .filter((attr) => attr !== undefinedValue)
        .map((attr) => `${fieldName}=${attr}`)
        .join('\n');
};

// プロフィール配列からINI用の文字列を生成する関数
const formatProfileRows = (profiles: string[], count: number): string => {
  return profiles.every((profile) => profile === '')
    ? Array(count).fill('プロフィール=').join('\n')
    : profiles
        .filter((profile) => profile !== '')
        .map((profile) => `プロフィール=${profile}`)
        .join('\n');
};

// ジンザイのINIコンテンツを生成する関数
export const generateJinzaiIniContent = (jinzai: Jinzai): string => {
  const imageRow = `画像=${jinzai.image}`;
  const nameRow = `名前=${jinzai.name || ''}`;
  const looksRow = `ルックス${formatRankValue(jinzai.looks)}`;
  const technicRow = `テクニック${formatRankValue(jinzai.technic)}`;
  const mentalRow = `メンタル${formatRankValue(jinzai.mental)}`;
  const attributeRows = formatAttributeRows(jinzai.attributes, '属性', nullText);
  const verginRow = jinzai.isVergin === null ? '処女=' : `処女=${jinzai.isVergin ? '1' : '0'}`;
  const voiceRow = jinzai.voice ? `音声=${jinzai.voice}` : '音声=';
  const profileRows = formatProfileRows(jinzai.profile, 3);

  return [
    imageRow,
    nameRow,
    looksRow,
    technicRow,
    mentalRow,
    attributeRows,
    verginRow,
    voiceRow,
    profileRows,
  ]
    .filter((row) => row !== '')
    .join('\n');
};

// コキャクのINIコンテンツを生成する関数
export const generateKokyakuIniContent = (kokyaku: Kokyaku): string => {
  const typeRow = `種類=${kokyaku.characterType}`;
  const imageRow = `画像=${kokyaku.image}`;
  const nameRow = `名前=${kokyaku.name}`;
  const incomeRow = `インカム${formatRankValue(kokyaku.income)}`;

  const presentRows = kokyaku.present
    .filter((present) => present !== '')
    .map((present) => `プレゼント=${present}`)
    .join('\n');

  const targetRows = formatAttributeRows(kokyaku.target, 'ターゲット', nullText);

  const profileArray = kokyaku.profile as string[];
  const profileRows = formatProfileRows(profileArray, 2);

  return [typeRow, imageRow, nameRow, incomeRow, presentRows, targetRows, profileRows]
    .filter((row) => row !== '')
    .join('\n');
};
