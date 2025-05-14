# CLINEからの改善提案

## 全体的な改善点

### 型定義の強化

1. **readonlyの活用**
   - `.clinerules`にある「できるだけreadonlyを使う」という方針に基づき、特に配列や定数オブジェクトに対してreadonlyを積極的に適用する
   - 例: `src/dohna-dohna/data.ts`の`Jinzai`や`Kokyaku`型のプロパティをreadonlyにする

```typescript
// 改善前
export type Jinzai = {
  image: Image | null;
  name: Name | null;
  // ...
};

// 改善後
export type Jinzai = {
  readonly image: Image | null;
  readonly name: Name | null;
  // ...
};
```

2. **より厳密な型定義**
   - 現在`null`を許容している箇所で、実際には特定の値しか取り得ない場合は、Union型を使用して明示的に定義する
   - 例: `src/dohna-dohna/data.ts`の`ProfileText`型を`string | null`から具体的な制約を持つ型に変更

```typescript
// 改善前
export type ProfileText = string | null;

// 改善後
export type ProfileText = string | null; // nullはランダム生成を意味する
```

3. **型エイリアスの活用**
   - 繰り返し使用される型パターンに対して型エイリアスを定義し、コードの可読性と保守性を向上させる

```typescript
// 例: ランダム可能な値の型を定義
export type Randomizable<T> = T | null; // nullはランダム生成を意味する
export type RandomizableRank = Randomizable<HaruuriCharacterParameter>;
```

### 関数型プログラミングの強化

1. **純粋関数の徹底**
   - 現在のコードでは、一部の関数が副作用を持っている。特に`downloadWithShiftJIS`関数はファイルのダウンロードという副作用を持つ
   - 副作用を持つ関数と純粋な計算を行う関数を明確に分離する

```typescript
// 改善前
export const downloadWithShiftJIS = (filename: string, content: string): void => {
  // ダウンロード処理（副作用）
};

// 改善後
// 純粋な変換関数
export const convertToShiftJIS = (content: string): Uint8Array => {
  // UTF-8からShift-JISへの変換処理（純粋関数）
  const unicodeArray = Encoding.stringToCode(content);
  const shiftJisArray = Encoding.convert(unicodeArray, {
    to: 'SJIS',
    from: 'UNICODE',
  });
  return new Uint8Array(shiftJisArray);
};

// 副作用を持つ関数
export const downloadFile = (filename: string, data: Uint8Array, mimeType: string): void => {
  // ダウンロード処理（副作用）
};

// 組み合わせ関数
export const downloadWithShiftJIS = (filename: string, content: string): void => {
  const shiftJisData = convertToShiftJIS(content);
  downloadFile(filename, shiftJisData, 'text/plain; charset=shift_jis');
};
```

2. **不変性の徹底**
   - 特にステート更新時に元のオブジェクトを変更せず、新しいオブジェクトを生成する方針を徹底する
   - 例: `CharacterEditor.tsx`の`handleJinzaiChange`や`handleKokyakuChange`関数でのステート更新

```typescript
// 改善前
setJinzai((prev) => {
  const updated = { ...prev };
  // プロパティの更新
  return updated;
});

// 改善後
setJinzai((prev) => ({
  ...prev,
  // プロパティの更新
}));
```

3. **関数合成の活用**
   - 複数の処理を行う関数を、より小さな関数の合成として表現する

```typescript
// 例: バリデーション関数の合成
const validateName = (name: string | null): boolean => name === null || name.length <= maxNameCount;
const validateProfileLine = (line: string | null, maxLength: number): boolean =>
  line === null || line.length <= maxLength;

// 関数合成によるバリデーション
const validateJinzai = (jinzai: Jinzai): JinzaiErrors => {
  const nameError = validateName(jinzai.name)
    ? undefined
    : `名前は${maxNameCount}文字以内で入力してください`;
  const profileErrors = jinzai.profiles.map((profile, index) =>
    validateProfileLine(profile, maxProfileLineLengthForJinzai)
      ? undefined
      : `プロフィールの${index + 1}行目は${maxProfileLineLengthForJinzai}文字以内で入力してください`
  );

  return {
    name: nameError,
    profiles: profileErrors.some((error) => error !== undefined) ? profileErrors : undefined,
  };
};
```

### コンポーネント設計の改善

1. **ロジックとUIの分離**
   - 現在のコンポーネントには、UIレンダリングとロジック処理が混在している箇所がある
   - カスタムフックを活用して、ロジックを分離する

```typescript
// 例: ジンザイフォームのロジックをカスタムフックに分離
function useJinzaiForm(initialJinzai: Jinzai) {
  const [jinzai, setJinzai] = useState<Jinzai>(initialJinzai);
  const [errors, setErrors] = useState<JinzaiErrors>({});

  const handleChange = (field: keyof Jinzai, value: any, index?: number) => {
    // 変更ハンドリングロジック
  };

  const validate = () => {
    // バリデーションロジック
  };

  return { jinzai, errors, handleChange, validate };
}

// コンポーネントでの使用
function JinzaiFormContainer() {
  const { jinzai, errors, handleChange, validate } = useJinzaiForm(getInitialJinzai());

  return (
    <JinzaiForm
      jinzai={jinzai}
      onChange={handleChange}
      errors={errors}
      // その他のprops
    />
  );
}
```

2. **コンポーネントの粒度**
   ✅ 完了

3. **Mantineのスタイリング方法の統一**
   - 現在、インラインスタイルとCSS Modulesが混在している
   - Mantine v7の推奨に従い、CSS Modulesに統一する

```typescript
// 改善前（App.tsxの例）
<Title
  order={1}
  ta="center"
  mt="xl"
  mb="lg"
  style={{
    fontSize: '3rem',
    fontWeight: 800,
    letterSpacing: '0.05em',
    transform: 'translateY(10px)',
  }}
>

// 改善後
// styles/Title.module.css
.mainTitle {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  transform: translateY(10px);
  text-align: center;
  margin-top: var(--mantine-spacing-xl);
  margin-bottom: var(--mantine-spacing-lg);
}

// App.tsx
<Title order={1} className={classes.mainTitle}>
```

### エラーハンドリングの改善

1. **より堅牢なエラーハンドリング**
   - 特にShiftJISエンコード処理でのエラーハンドリングを強化
   - ユーザーに対してより明確なエラーメッセージを提供

```typescript
// 改善例
export const downloadWithShiftJIS = (filename: string, content: string): Result<void, Error> => {
  try {
    // 変換処理
    return { success: true };
  } catch (e) {
    console.error('Shift-JIS変換エラー:', e);

    // より具体的なエラー情報を返す
    if (e instanceof EncodingError) {
      return {
        success: false,
        error: new Error(
          '文字コードの変換に失敗しました。使用できない文字が含まれている可能性があります。'
        ),
      };
    }

    return {
      success: false,
      error: new Error('ファイルのダウンロード中にエラーが発生しました。'),
    };
  }
};

// Result型の定義
type Result<T, E> = { success: true; value?: T } | { success: false; error: E };
```

2. **バリデーションの強化**
   - 現在のバリデーションは主に文字数チェックに限られている
   - より包括的なバリデーション（禁止文字のチェックなど）を追加

```typescript
// 例: ShiftJISで表現できない文字をチェックするバリデーション
const containsUnsupportedChars = (text: string): boolean => {
  // ShiftJISでサポートされていない文字のチェックロジック
  return /[^\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0370-\u03FF\u0400-\u04FF\u2000-\u206F\u2100-\u214F\u2190-\u21FF\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/.test(
    text
  );
};

// バリデーション関数に組み込む
const validateName = (name: string | null): string | undefined => {
  if (name === null) return undefined;
  if (name.length > maxNameCount) return `名前は${maxNameCount}文字以内で入力してください`;
  if (containsUnsupportedChars(name)) return 'ShiftJISで表現できない文字が含まれています';
  return undefined;
};
```

### テストの強化

1. **テストカバレッジの向上**
   - 現在、一部のモジュールにのみテストが実装されている
   - 特に重要なビジネスロジック（バリデーション、データ変換など）のテストカバレッジを向上させる

```typescript
// 例: バリデーション関数のテスト
describe('validateJinzai', () => {
  it('有効なジンザイデータに対してエラーを返さない', () => {
    const validJinzai = {
      /* 有効なデータ */
    };
    const errors = validateJinzai(validJinzai);
    expect(errors.name).toBeUndefined();
    expect(errors.profiles).toBeUndefined();
  });

  it('名前が長すぎる場合にエラーを返す', () => {
    const invalidJinzai = {
      /* 名前が長すぎるデータ */
    };
    const errors = validateJinzai(invalidJinzai);
    expect(errors.name).toBe(`名前は${maxNameCount}文字以内で入力してください`);
  });

  // その他のテストケース
});
```

2. **E2Eテストの導入**
   - ユーザーの実際の操作フローをテストするE2Eテストを導入
   - Cypress、Playwright、TestingLibraryなどのツールを活用

```typescript
// 例: Cypressを使用したE2Eテスト
describe('キャラクター作成フロー', () => {
  it('ジンザイを作成してダウンロードできる', () => {
    cy.visit('/');
    cy.contains('ジンザイ').click();
    cy.get('[data-testid="name-input"]').type('テスト');
    // その他の入力操作
    cy.contains('.txtファイルを生成してダウンロード').click();
    // ダウンロードの検証
  });
});
```

### パフォーマンスの最適化

1. **メモ化の活用**
   - 計算コストの高い処理や頻繁に再レンダリングされるコンポーネントに対して、`useMemo`や`useCallback`、`React.memo`を活用

```typescript
// 例: 属性リストのメモ化
const AttributeSelector = React.memo(
  ({ selectedAttributes, onChange, attributes }: AttributeSelectorProps) => {
    // コンポーネント実装
  }
);

// 例: 計算コストの高い処理のメモ化
const JinzaiForm = ({ jinzai, onChange, attributes, voices, errors }: JinzaiFormProps) => {
  // 属性の詳細情報を計算（コストの高い処理と仮定）
  const attributeDetails = useMemo(() => {
    return jinzai.attributes
      .filter((attr): attr is Attribute => attr !== null)
      .map(calculateAttributeDetails);
  }, [jinzai.attributes]);

  // コンポーネント実装
};
```

2. **レンダリングの最適化**
   - 不要な再レンダリングを防ぐために、状態の更新方法を見直す

```typescript
// 例: フォーム入力時の最適化
const handleProfileChange = (value: string, index: number) => {
  // 値が実際に変わった場合のみ状態を更新
  if (jinzai.profiles[index] !== value) {
    onChange('profiles', value, index);
  }
};
```

### アクセシビリティの向上

1. **WAI-ARIA対応の強化**
   - フォーム要素に適切なaria属性を追加
   - キーボードナビゲーションのサポートを強化

```typescript
// 例: アクセシビリティを考慮したフォーム要素
<TextInput
  label={`名前 (最大${maxNameCount}文字)`}
  placeholder="名前を入力してください"
  value={modelToView(jinzai.name, '')}
  onChange={(e) => onChange('name', e.target.value === '' ? null : e.target.value)}
  error={errors.name}
  aria-required="true"
  aria-invalid={!!errors.name}
  aria-describedby={errors.name ? "name-error" : undefined}
/>
{errors.name && <div id="name-error" aria-live="polite">{errors.name}</div>}
```

### ユーザビリティの向上

1. **フォームのリセット機能**
   - 入力内容を初期状態に戻す機能を追加

```typescript
// 例: リセットボタンの追加
const resetForm = () => {
  setJinzai(getInitialJinzai());
  setJinzaiErrors({});
};

// JSX
<Button onClick={resetForm} variant="outline">フォームをリセット</Button>
```

2. **入力内容の保存機能**
   - ブラウザのローカルストレージを使用して、入力途中の内容を保存する機能を追加

```typescript
// 例: ローカルストレージを使用した状態の保存と復元
useEffect(() => {
  // 初期表示時に保存データがあれば復元
  const savedJinzai = localStorage.getItem('savedJinzai');
  if (savedJinzai) {
    try {
      setJinzai(JSON.parse(savedJinzai));
    } catch (e) {
      console.error('保存データの復元に失敗しました:', e);
    }
  }
}, []);

// 状態が変更されたら保存
useEffect(() => {
  localStorage.setItem('savedJinzai', JSON.stringify(jinzai));
}, [jinzai]);

// 明示的に保存するボタンも追加
const saveCurrentState = () => {
  localStorage.setItem('savedJinzai', JSON.stringify(jinzai));
  // 保存成功のフィードバック
};

// JSX
<Button onClick={saveCurrentState}>現在の入力内容を保存</Button>
```

## まとめ

上記の改善提案は、現在のプロジェクトの基本構造を維持しながら、コードの品質、保守性、ユーザビリティを向上させることを目的としています。特に関数型プログラミングの原則に沿った実装の強化と、型システムの活用による安全性の向上に重点を置いています。

これらの改善を段階的に適用することで、より堅牢で拡張性の高いアプリケーションになることが期待されます。
