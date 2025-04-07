import { Kokyaku } from '../types/DohnaDohna';

type KokyakuFormProps = {
  kokyaku: Kokyaku;
  onChange: (field: keyof Kokyaku, value: string, index?: number) => void;
  attributes: string[];
  rankNames: string[];
  undefinedRandomText: string;
};

// 値がnullの場合に表示用の値を返す
const modelToView = (value: string | null, defaultValue: string): string => {
  return value !== null ? value : defaultValue;
};

// 属性の値を取得
const attributesToValue = (attributes: string[], index: number): string => {
  return attributes[index] || '';
};

// 属性選択コンポーネント
const AttributeSelector = ({
  value,
  onChange,
  attributes,
  index,
}: {
  value: string;
  onChange: (value: string, index: number) => void;
  attributes: string[];
  index: number;
}) => (
  <div style={{ marginBottom: '10px' }}>
    <select value={value} onChange={(e) => onChange(e.target.value, index)}>
      {attributes.map((attribute) => (
        <option key={attribute} value={attribute}>
          {attribute}
        </option>
      ))}
    </select>
  </div>
);

// プレゼント入力コンポーネント
const PresentInput = ({
  value,
  onChange,
  index,
}: {
  value: string;
  onChange: (value: string, index: number) => void;
  index: number;
}) => (
  <div style={{ marginBottom: '10px' }}>
    <input
      placeholder="プレゼント (例: LKS↑↑, TEC↓)"
      value={value}
      onChange={(e) => onChange(e.target.value, index)}
    />
  </div>
);

// プロフィール入力コンポーネント
const ProfileInput = ({
  value,
  onChange,
  index,
  placeholder,
}: {
  value: string;
  onChange: (value: string, index: number) => void;
  index: number;
  placeholder: string;
}) => (
  <div style={{ marginBottom: '10px' }}>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value, index)}
    />
  </div>
);

export const KokyakuForm = ({
  kokyaku,
  onChange,
  attributes,
  rankNames,
  undefinedRandomText,
}: KokyakuFormProps) => {
  // 属性変更ハンドラー
  const handleTargetChange = (value: string, index: number) => {
    onChange('target', value, index);
  };

  // プレゼント変更ハンドラー
  const handlePresentChange = (value: string, index: number) => {
    onChange('present', value, index);
  };

  // プロフィール変更ハンドラー
  const handleProfileChange = (value: string, index: number) => {
    onChange('profile', value, index);
  };

  // プロフィールの値を取得
  const getProfileValue = (index: number): string => {
    if (!kokyaku.profile) return '';
    const profiles = kokyaku.profile as string[];
    return profiles[index] || '';
  };

  return (
    <div>
      <h2>コキャク設定</h2>

      <div className="form-group">
        <label>画像ファイル名</label>
        <input
          placeholder="画像ファイル名を入力してください"
          value={kokyaku.image}
          onChange={(e) => onChange('image', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>名前 (最大6文字)</label>
        <input
          placeholder="名前を入力してください"
          value={kokyaku.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>インカム</label>
        <select
          value={modelToView(kokyaku.income, undefinedRandomText)}
          onChange={(e) => onChange('income', e.target.value)}
        >
          {rankNames.map((rank) => (
            <option key={rank} value={rank}>
              {rank}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>プレゼント</label>
        {kokyaku.present.map((present, index) => (
          <PresentInput key={index} value={present} onChange={handlePresentChange} index={index} />
        ))}
      </div>

      <div className="form-group">
        <label>ターゲット (最大3つ)</label>
        <AttributeSelector
          value={attributesToValue(kokyaku.target, 0)}
          onChange={handleTargetChange}
          attributes={attributes}
          index={0}
        />
        <AttributeSelector
          value={attributesToValue(kokyaku.target, 1)}
          onChange={handleTargetChange}
          attributes={attributes}
          index={1}
        />
        <AttributeSelector
          value={attributesToValue(kokyaku.target, 2)}
          onChange={handleTargetChange}
          attributes={attributes}
          index={2}
        />
      </div>

      <div className="form-group">
        <label>プロフィール (最大2行)</label>
        <ProfileInput
          value={getProfileValue(0)}
          onChange={handleProfileChange}
          index={0}
          placeholder="1行目"
        />
        <ProfileInput
          value={getProfileValue(1)}
          onChange={handleProfileChange}
          index={1}
          placeholder="2行目"
        />
      </div>
    </div>
  );
};
