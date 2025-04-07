import { Jinzai } from '../types/DohnaDohna';

type JinzaiFormProps = {
  jinzai: Jinzai;
  onChange: (field: keyof Jinzai, value: string | boolean, index?: number) => void;
  attributes: string[];
  rankNames: string[];
  voices: string[];
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

export const JinzaiForm = ({
  jinzai,
  onChange,
  attributes,
  rankNames,
  voices,
  undefinedRandomText,
}: JinzaiFormProps) => {
  // 属性変更ハンドラー
  const handleAttributeChange = (value: string, index: number) => {
    onChange('attributes', value, index);
  };

  // プロフィール変更ハンドラー
  const handleProfileChange = (value: string, index: number) => {
    onChange('profile', value, index);
  };

  return (
    <div>
      <h2>ジンザイ設定</h2>

      <div className="form-group">
        <label>画像ファイル名</label>
        <input
          placeholder="画像ファイル名を入力してください"
          value={jinzai.image}
          onChange={(e) => onChange('image', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>名前 (最大6文字)</label>
        <input
          placeholder="名前を入力してください"
          value={modelToView(jinzai.name, '')}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>ルックス</label>
        <select
          value={modelToView(jinzai.looks, undefinedRandomText)}
          onChange={(e) => onChange('looks', e.target.value)}
        >
          {rankNames.map((rank) => (
            <option key={rank} value={rank}>
              {rank}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>テクニック</label>
        <select
          value={modelToView(jinzai.technic, undefinedRandomText)}
          onChange={(e) => onChange('technic', e.target.value)}
        >
          {rankNames.map((rank) => (
            <option key={rank} value={rank}>
              {rank}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>メンタル</label>
        <select
          value={modelToView(jinzai.mental, undefinedRandomText)}
          onChange={(e) => onChange('mental', e.target.value)}
        >
          {rankNames.map((rank) => (
            <option key={rank} value={rank}>
              {rank}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>属性 (最大3つ)</label>
        <AttributeSelector
          value={attributesToValue(jinzai.attributes, 0)}
          onChange={handleAttributeChange}
          attributes={attributes}
          index={0}
        />
        <AttributeSelector
          value={attributesToValue(jinzai.attributes, 1)}
          onChange={handleAttributeChange}
          attributes={attributes}
          index={1}
        />
        <AttributeSelector
          value={attributesToValue(jinzai.attributes, 2)}
          onChange={handleAttributeChange}
          attributes={attributes}
          index={2}
        />
      </div>

      <div className="form-group">
        <label>処女設定</label>
        <div className="radio-group">
          <div>
            <input
              type="radio"
              id="vergin-yes"
              checked={jinzai.isVergin === true}
              onChange={() => onChange('isVergin', true)}
            />
            <label htmlFor="vergin-yes">処女 (1)</label>
          </div>
          <div>
            <input
              type="radio"
              id="vergin-no"
              checked={jinzai.isVergin === false}
              onChange={() => onChange('isVergin', false)}
            />
            <label htmlFor="vergin-no">非処女 (0)</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>音声</label>
        <select
          value={modelToView(jinzai.voice, undefinedRandomText)}
          onChange={(e) => onChange('voice', e.target.value)}
        >
          {voices.map((voice) => (
            <option key={voice} value={voice}>
              {voice}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>プロフィール (最大3行)</label>
        <ProfileInput
          value={jinzai.profile[0] || ''}
          onChange={handleProfileChange}
          index={0}
          placeholder="1行目"
        />
        <ProfileInput
          value={jinzai.profile[1] || ''}
          onChange={handleProfileChange}
          index={1}
          placeholder="2行目"
        />
        <ProfileInput
          value={jinzai.profile[2] || ''}
          onChange={handleProfileChange}
          index={2}
          placeholder="3行目"
        />
      </div>
    </div>
  );
};
