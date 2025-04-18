import { HaruuriCharacterParameter, Jinzai, JinzaiProfileTexts, Kokyaku, rankInfo, Attribute } from './data';

// ランク値からINI用の文字列を生成する関数
const formatRankValue = (value: HaruuriCharacterParameter): string => {
  const rank = rankInfo.find((rank) => {
    return rank.value === value;
  });
  return rank ? `${rank.name}` : '';
};

// 属性配列からINI用の文字列を生成する関数
const formatAttributeRows = (
  attributes: Array<Attribute | null>,
  fieldName: string,
  undefinedValue: null
): string => {
  // 全ての属性がnullまたは「ランダム」の場合、属性行を出力しない（ランダム設定）
  if (attributes.every((attr) => attr === undefinedValue || (attr && attr.name === 'ランダム1') || (attr && attr.name === 'ランダム2') || (attr && attr.name === 'ランダム3'))) {
    return '';
  }

  // 属性が選択されている場合（nullでない、かつ「ランダム」でない属性のみを出力）
  const validAttributes = attributes.filter(
    (attr) => attr !== undefinedValue && !(attr && (attr.name === 'ランダム1' || attr.name === 'ランダム2' || attr.name === 'ランダム3'))
  );

  // 有効な属性がない場合は空欄（属性なし）を表現
  if (validAttributes.length === 0) {
    return Array(3).fill(`${fieldName}=`).join('\n');
  }

  // 有効な属性を出力
  return validAttributes.map((attr) => `${fieldName}=${attr ? attr.name : ''}`).join('\n');
};

// プロフィール配列からINI用の文字列を生成する関数
const formatProfileRows = (profiles: JinzaiProfileTexts): string => {
  return profiles
    .filter((profile) => profile !== null)
    .map((profile) => `プロフィール=${profile}`)
    .join('\n');
};

// ジンザイのINIコンテンツを生成する関数
export const generateJinzaiIniContent = (jinzai: Jinzai): string => {
  const imageRow = jinzai.image === null ? null : `画像=${jinzai.image}`;
  const nameRow = jinzai.image === null ? null : `名前=${jinzai.name || ''}`;
  const looksRow = jinzai.looks === null ? null : `ルックス=${formatRankValue(jinzai.looks)}`;
  const technicRow =
    jinzai.technic === null ? null : `テクニック=${formatRankValue(jinzai.technic)}`;
  const mentalRow = jinzai.mental === null ? null : `メンタル=${formatRankValue(jinzai.mental)}`;
  const attributeRows = formatAttributeRows(jinzai.attributes, '属性', null);
  const verginRow = jinzai.isVergin === null ? null : `処女=${jinzai.isVergin ? '1' : '0'}`;
  const voiceRow = jinzai.voice === null ? null : jinzai.voice ? `音声=${jinzai.voice}` : '音声=';
  const profileRows = formatProfileRows(jinzai.profiles);

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
    .filter((row) => row !== null && row !== '')
    .join('\n');
};

// コキャクのINIコンテンツを生成する関数
export const generateKokyakuIniContent = (kokyaku: Kokyaku): string => {
  const typeRow = `種類=${kokyaku.characterType}`;
  const imageRow = `画像=${kokyaku.image}`;
  const nameRow = `名前=${kokyaku.name}`;
  const incomeRow = `インカム${formatRankValue(kokyaku.income)}`;

  // プレゼントが「ランダム」または空の場合は出力しない
  const presentRow = kokyaku.present !== 'ランダム' && kokyaku.present !== null && kokyaku.present !== ''
    ? `プレゼント=${kokyaku.present}`
    : '';

  const targetRows = formatAttributeRows(kokyaku.targets, 'ターゲット', null);

  const profileArray = kokyaku.profiles as string[];
  const profileRows = formatProfileRows(profileArray);

  return [typeRow, imageRow, nameRow, incomeRow, presentRow, targetRows, profileRows]
    .filter((row) => row !== null && row !== '')
    .join('\n');
};
