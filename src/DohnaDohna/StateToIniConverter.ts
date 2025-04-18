import {
  HaruuriCharacterParameter,
  Jinzai,
  JinzaiProfileTexts,
  Kokyaku,
  rankInfo,
  Attribute,
} from './data';

// ランク値からINI用の文字列を生成する関数
const formatRankValue = (value: HaruuriCharacterParameter): string => {
  const rank = rankInfo.find((rank) => {
    return rank.value === value;
  });
  return rank ? `${rank.name}` : '';
};

// 属性配列からINI用の文字列を生成する関数
const formatAttributeRows = (attributes: Array<Attribute | null>, fieldName: string): string => {
  // ランダムかどうかを判定する関数
  const isRandom = (attr: Attribute | null): boolean => {
    return (
      attr !== null &&
      (attr.name === 'ランダム1' || attr.name === 'ランダム2' || attr.name === 'ランダム3')
    );
  };

  // 有効な属性（nullでない、かつランダムでない）を抽出
  const validAttributes = attributes.filter((attr) => !isRandom(attr));
  console.info(validAttributes);
  // 有効な属性を出力し、足りない分は空欄で埋める
  const result: string[] = [];
  // 有効な属性を追加
  validAttributes.forEach((attr) => {
    result.push(`${fieldName}=${attr ? attr.name : ''}`);
  });

  return result.join('\n');
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
  const nameRow = jinzai.name === null ? null : `名前=${jinzai.name || ''}`;
  const looksRow = jinzai.looks === null ? null : `ルックス=${formatRankValue(jinzai.looks)}`;
  const technicRow =
    jinzai.technic === null ? null : `テクニック=${formatRankValue(jinzai.technic)}`;
  const mentalRow = jinzai.mental === null ? null : `メンタル=${formatRankValue(jinzai.mental)}`;
  const attributeRows = formatAttributeRows(jinzai.attributes, '属性');
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
  const imageRow = kokyaku.image === null ? null : `画像=${kokyaku.image}`;
  const nameRow = kokyaku.name === null ? null : `名前=${kokyaku.name}`;
  const incomeRow = kokyaku.income === null ? null : `インカム=${formatRankValue(kokyaku.income)}`;

  // プレゼントの処理
  let presentRow = null;
  if (kokyaku.present === 'ランダム') {
    presentRow = null;
  } else if (kokyaku.present !== null && kokyaku.present !== '') {
    presentRow = `プレゼント=${kokyaku.present}`;
  } else {
    presentRow = 'プレゼント=';
  }

  const targetRows = formatAttributeRows(kokyaku.targets, 'ターゲット');

  const profileArray = kokyaku.profiles as string[];
  const profileRows = formatProfileRows(profileArray);

  return [typeRow, imageRow, nameRow, incomeRow, presentRow, targetRows, profileRows]
    .filter((row) => row !== null && row !== '')
    .join('\n');
};
