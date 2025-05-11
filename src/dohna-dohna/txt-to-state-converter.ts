import { Jinzai, Kokyaku, rankInfo, voices, HaruuriCharacterParameter } from './data';
import { Attribute, attributes } from './attribute';

// テキスト行からキーと値を抽出する関数
const parseKeyValue = (line: string): [string, string] => {
  const parts = line.split('=');
  if (parts.length < 2) {
    return [parts[0], ''];
  }
  const key = parts[0];
  const value = parts.slice(1).join('='); // 値に=が含まれている場合に対応
  return [key, value];
};

// ランク名から値を取得する関数
const getRankValueFromName = (rankName: string): HaruuriCharacterParameter => {
  const rank = rankInfo.find((r) => r.name === rankName);
  return rank ? rank.value as HaruuriCharacterParameter : null;
};

// 属性名から属性オブジェクトを取得する関数
const getAttributeByName = (name: string): Attribute | null => {
  if (!name || name === '') return null;
  const attribute = attributes.find((attr) => attr.name === name);
  return attribute || null;
};

// テキストファイルの内容からジンザイのステートを生成する関数
export const parseJinzaiFromText = (text: string): Jinzai => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  
  // 初期値を設定
  const jinzai: Jinzai = {
    image: null,
    name: null,
    looks: null,
    technic: null,
    mental: null,
    attributes: [null, null, null],
    isVergin: null,
    voice: null,
    profiles: ['', '', ''],
  };

  // 属性とプロフィールのカウンタ
  let attributeCount = 0;
  let profileCount = 0;

  // 各行を解析
  for (const line of lines) {
    const [key, value] = parseKeyValue(line);

    switch (key) {
      case '画像':
        // .pngが付いていれば削除
        jinzai.image = value.endsWith('.png') ? value.slice(0, -4) : value;
        break;
      case '名前':
        jinzai.name = value;
        break;
      case 'ルックス':
        jinzai.looks = getRankValueFromName(value);
        break;
      case 'テクニック':
        jinzai.technic = getRankValueFromName(value);
        break;
      case 'メンタル':
        jinzai.mental = getRankValueFromName(value);
        break;
      case '属性':
        if (attributeCount < 3) {
          jinzai.attributes[attributeCount] = getAttributeByName(value);
          attributeCount++;
        }
        break;
      case '処女':
        jinzai.isVergin = value === '1';
        break;
      case '音声':
        // 音声が有効な値かチェック
        jinzai.voice = voices.includes(value) ? value : null;
        break;
      case 'プロフィール':
        if (profileCount < 3) {
          jinzai.profiles[profileCount] = value;
          profileCount++;
        }
        break;
    }
  }

  return jinzai;
};

// テキストファイルの内容からコキャクのステートを生成する関数
export const parseKokyakuFromText = (text: string): Kokyaku => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  
  // 初期値を設定
  const kokyaku: Kokyaku = {
    characterType: 'コキャク',
    image: null,
    name: null,
    income: null,
    present: null,
    targets: [null, null, null],
    profiles: ['', ''],
  };

  // ターゲットとプロフィールのカウンタ
  let targetCount = 0;
  let profileCount = 0;

  // 各行を解析
  for (const line of lines) {
    const [key, value] = parseKeyValue(line);

    switch (key) {
      case '種類':
        kokyaku.characterType = value;
        break;
      case '画像':
        // .pngが付いていれば削除
        kokyaku.image = value.endsWith('.png') ? value.slice(0, -4) : value;
        break;
      case '名前':
        kokyaku.name = value;
        break;
      case 'インカム':
        kokyaku.income = getRankValueFromName(value);
        break;
      case 'プレゼント':
        kokyaku.present = value;
        break;
      case 'ターゲット':
        if (targetCount < 3) {
          kokyaku.targets[targetCount] = getAttributeByName(value);
          targetCount++;
        }
        break;
      case 'プロフィール':
        if (profileCount < 2) {
          kokyaku.profiles[profileCount] = value;
          profileCount++;
        }
        break;
    }
  }

  return kokyaku;
};

// テキストファイルの内容からキャラクタータイプを判定する関数
export const detectCharacterTypeFromText = (text: string): 'ジンザイ' | 'コキャク' => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  
  // 種類=コキャクの行があればコキャク
  for (const line of lines) {
    const [key, value] = parseKeyValue(line);
    if (key === '種類' && value === 'コキャク') {
      return 'コキャク';
    }
  }
  
  // それ以外はジンザイと判定
  return 'ジンザイ';
};
