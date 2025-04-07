import { useState } from 'react';
import {
  Jinzai,
  Kokyaku,
  undefinedRandomText,
  undefinedText,
  attributes,
  rankNames,
  voices,
} from '../types/DohnaDohna';
import { downloadWithShiftJIS } from '../utils/shiftJisEncoder';
import { JinzaiForm } from './JinzaiForm';
import { KokyakuForm } from './KokyakuForm';
import '../styles/CharacterEditor.css';

// キャラクタータイプの定義
type CharacterType = 'jinzai' | 'kokyaku';

// ジンザイの初期状態を作成する関数
const createInitialJinzai = (): Jinzai => ({
  image: '',
  name: null,
  looks: null,
  technic: null,
  mental: null,
  attributes: [undefinedText, undefinedText, undefinedText],
  isVergin: null,
  voice: null,
  profile: ['', '', ''],
});

// コキャクの初期状態を作成する関数
const createInitialKokyaku = (): Kokyaku => ({
  characterType: 'コキャク',
  image: '',
  name: '',
  income: null,
  present: [''],
  target: [undefinedText, undefinedText, undefinedText],
  profile: ['', ''],
});

// 値がnullになるべきかを判定する関数
const shouldBeNull = (value: string | boolean): boolean =>
  typeof value === 'string' &&
  (value === undefinedText || value === undefinedRandomText || value === '');

// 配列フィールドを更新する関数
const updateArrayField = <T,>(array: T[], index: number, value: T): T[] => {
  const newArray = [...array];
  newArray[index] = value;
  return newArray;
};

// プレゼント配列を更新する関数（最後の要素に入力があれば新しい入力欄を追加）
const updatePresentArray = (presents: string[], index: number, value: string): string[] => {
  const newPresents = [...presents];

  // 最後のフィールドに入力があり、新しい入力欄が必要な場合
  if (index === presents.length - 1 && value !== '') {
    newPresents[index] = value;
    newPresents.push('');
  } else {
    newPresents[index] = value;
  }

  return newPresents;
};

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
const generateJinzaiIniContent = (jinzai: Jinzai): string => {
  const imageRow = `画像=${jinzai.image}`;
  const nameRow = `名前=${jinzai.name || ''}`;
  const looksRow = `ルックス${formatRankValue(jinzai.looks)}`;
  const technicRow = `テクニック${formatRankValue(jinzai.technic)}`;
  const mentalRow = `メンタル${formatRankValue(jinzai.mental)}`;
  const attributeRows = formatAttributeRows(jinzai.attributes, '属性', undefinedText);
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
const generateKokyakuIniContent = (kokyaku: Kokyaku): string => {
  const typeRow = `種類=${kokyaku.characterType}`;
  const imageRow = `画像=${kokyaku.image}`;
  const nameRow = `名前=${kokyaku.name}`;
  const incomeRow = `インカム${formatRankValue(kokyaku.income)}`;

  const presentRows = kokyaku.present
    .filter((present) => present !== '')
    .map((present) => `プレゼント=${present}`)
    .join('\n');

  const targetRows = formatAttributeRows(kokyaku.target, 'ターゲット', undefinedText);

  const profileArray = kokyaku.profile as string[];
  const profileRows = formatProfileRows(profileArray, 2);

  return [typeRow, imageRow, nameRow, incomeRow, presentRows, targetRows, profileRows]
    .filter((row) => row !== '')
    .join('\n');
};

// キャラクタータイプセレクターコンポーネント
const CharacterTypeSelector = ({
  characterType,
  onChange,
}: {
  characterType: CharacterType;
  onChange: (type: CharacterType) => void;
}) => (
  <div className="character-type-selector">
    <div>
      <input
        type="radio"
        id="jinzai"
        checked={characterType === 'jinzai'}
        onChange={() => onChange('jinzai')}
      />
      <label htmlFor="jinzai">ジンザイ</label>
    </div>
    <div>
      <input
        type="radio"
        id="kokyaku"
        checked={characterType === 'kokyaku'}
        onChange={() => onChange('kokyaku')}
      />
      <label htmlFor="kokyaku">コキャク</label>
    </div>
  </div>
);

// ファイル生成ボタンコンポーネント
const GenerateFileButton = ({ onClick }: { onClick: () => void }) => (
  <div className="generate-button-container">
    <button onClick={onClick} className="generate-button">
      .txtファイルを生成してダウンロード
    </button>
  </div>
);

const CharacterEditor = () => {
  // キャラクタータイプの状態
  const [characterType, setCharacterType] = useState<CharacterType>('jinzai');

  // ジンザイの初期状態
  const [jinzai, setJinzai] = useState<Jinzai>(createInitialJinzai());

  // コキャクの初期状態
  const [kokyaku, setKokyaku] = useState<Kokyaku>(createInitialKokyaku());

  // ジンザイのフィールド更新ハンドラー
  const handleJinzaiChange = (field: keyof Jinzai, value: string | boolean, index?: number) => {
    setJinzai((prev) => {
      const updated = { ...prev };

      if (field === 'attributes' && typeof index === 'number') {
        updated.attributes = updateArrayField(prev.attributes, index, value as string);
      } else if (field === 'profile' && typeof index === 'number') {
        updated.profile = updateArrayField(prev.profile, index, value as string);
      } else {
        // @ts-expect-error - 動的なフィールド更新
        updated[field] = shouldBeNull(value) ? null : value;
      }

      return updated;
    });
  };

  // コキャクのフィールド更新ハンドラー
  const handleKokyakuChange = (field: keyof Kokyaku, value: string, index?: number) => {
    setKokyaku((prev) => {
      const updated = { ...prev };

      if (field === 'target' && typeof index === 'number') {
        updated.target = updateArrayField(prev.target, index, value);
      } else if (field === 'present' && typeof index === 'number') {
        updated.present = updatePresentArray(prev.present, index, value);
      } else if (field === 'profile' && typeof index === 'number') {
        const newProfile = [...(prev.profile as string[])];
        newProfile[index] = value;
        updated.profile = newProfile;
      } else {
        // @ts-expect-error - 動的なフィールド更新
        updated[field] = shouldBeNull(value) ? null : value;
      }

      return updated;
    });
  };

  // INIファイル形式のコンテンツを生成
  const generateIniContent = (): string => {
    return characterType === 'jinzai'
      ? generateJinzaiIniContent(jinzai)
      : generateKokyakuIniContent(kokyaku);
  };

  // ファイル生成とダウンロード処理
  const handleGenerateFile = () => {
    const filename =
      characterType === 'jinzai'
        ? `${jinzai.name || 'jinzai'}.txt`
        : `${kokyaku.name || 'kokyaku'}.txt`;

    const content = generateIniContent();
    downloadWithShiftJIS(filename, content);
  };

  // 現在のキャラクタータイプに基づいてフォームを表示
  const renderCharacterForm = () => {
    return characterType === 'jinzai' ? (
      <JinzaiForm
        jinzai={jinzai}
        onChange={handleJinzaiChange}
        attributes={attributes}
        rankNames={rankNames}
        voices={voices}
        undefinedRandomText={undefinedRandomText}
      />
    ) : (
      <KokyakuForm
        kokyaku={kokyaku}
        onChange={handleKokyakuChange}
        attributes={attributes}
        rankNames={rankNames}
        undefinedRandomText={undefinedRandomText}
      />
    );
  };

  return (
    <div className="character-editor">
      <h1>ドーナドーナ キャラクターエディター</h1>

      <CharacterTypeSelector characterType={characterType} onChange={setCharacterType} />

      {renderCharacterForm()}

      <GenerateFileButton onClick={handleGenerateFile} />
    </div>
  );
};

export default CharacterEditor;
