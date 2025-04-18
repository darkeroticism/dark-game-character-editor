import { describe, it, expect } from 'vitest';
import { generateJinzaiIniContent, generateKokyakuIniContent } from './StateToIniConverter';
import { Jinzai, Kokyaku } from './data';

describe('generateJinzaiIniContent', () => {
  it('正しいINIコンテンツを生成する - 基本的なケース', () => {
    const jinzai: Jinzai = {
      image: 'test.png',
      name: 'テスト',
      looks: 10,
      technic: 8,
      mental: 6,
      attributes: ['巨乳', '令嬢', null],
      isVergin: true,
      voice: '女子汎用／高／真面目',
      profiles: ['テスト1', 'テスト2', ''],
    };

    const result = generateJinzaiIniContent(jinzai);

    // 期待される出力を検証
    expect(result).toContain('画像=test.png');
    expect(result).toContain('名前=テスト');
    expect(result).toContain('ルックス=S+');
    expect(result).toContain('テクニック=A');
    expect(result).toContain('メンタル=B+');
    expect(result).toContain('属性=巨乳');
    expect(result).toContain('属性=令嬢');
    expect(result).toContain('処女=1');
    expect(result).toContain('音声=女子汎用／高／真面目');
    expect(result).toContain('プロフィール=テスト1');
    expect(result).toContain('プロフィール=テスト2');

    // 空の属性は含まれないことを確認
    expect(result.match(/属性=/g)?.length).toBe(2);

    // 空のプロフィールは含まれないことを確認
    expect(result.match(/プロフィール=/g)?.length).toBe(2);
  });

  it('正しいINIコンテンツを生成する - 最小限のケース', () => {
    const jinzai: Jinzai = {
      image: '',
      name: null,
      looks: null,
      technic: null,
      mental: null,
      attributes: [null, null, null],
      isVergin: null,
      voice: null,
      profiles: ['', '', ''],
    };

    const result = generateJinzaiIniContent(jinzai);

    // 期待される出力を検証
    expect(result).toContain('画像=');
    expect(result).toContain('名前=');
    expect(result).toContain('ルックス=');
    expect(result).toContain('テクニック=');
    expect(result).toContain('メンタル=');
    expect(result).toContain('属性=');
    expect(result).toContain('処女=');
    expect(result).toContain('音声=');
    expect(result).toContain('プロフィール=');

    // 属性は3つあることを確認
    expect(result.match(/属性=/g)?.length).toBe(3);

    // プロフィールは3つあることを確認
    expect(result.match(/プロフィール=/g)?.length).toBe(3);
  });

  it('処女フラグが正しく設定される', () => {
    // 処女の場合
    const jinzaiVergin: Jinzai = {
      image: '',
      name: null,
      looks: null,
      technic: null,
      mental: null,
      attributes: [null, null, null],
      isVergin: true,
      voice: null,
      profiles: ['', '', ''],
    };

    expect(generateJinzaiIniContent(jinzaiVergin)).toContain('処女=1');

    // 非処女の場合
    const jinzaiNonVergin: Jinzai = {
      image: '',
      name: null,
      looks: null,
      technic: null,
      mental: null,
      attributes: [null, null, null],
      isVergin: false,
      voice: null,
      profiles: ['', '', ''],
    };

    expect(generateJinzaiIniContent(jinzaiNonVergin)).toContain('処女=0');

    // 未設定の場合
    const jinzaiUnknownVergin: Jinzai = {
      image: '',
      name: null,
      looks: null,
      technic: null,
      mental: null,
      attributes: [null, null, null],
      isVergin: null,
      voice: null,
      profiles: ['', '', ''],
    };

    expect(generateJinzaiIniContent(jinzaiUnknownVergin)).toContain('処女=');
  });
});

describe('generateKokyakuIniContent', () => {
  it('正しいINIコンテンツを生成する - 基本的なケース', () => {
    const kokyaku: Kokyaku = {
      characterType: 'コキャク',
      image: 'kokyaku.png',
      name: 'コキャク',
      income: 9,
      present: ['LKS↑↑', 'TEC↓'],
      targets: ['巨乳', '令嬢', null],
      profiles: ['コキャクプロフィール1', 'コキャクプロフィール2'],
    };

    const result = generateKokyakuIniContent(kokyaku);

    // 期待される出力を検証
    expect(result).toContain('種類=コキャク');
    expect(result).toContain('画像=kokyaku.png');
    expect(result).toContain('名前=コキャク');
    expect(result).toContain('インカム=S');
    expect(result).toContain('プレゼント=LKS↑↑');
    expect(result).toContain('プレゼント=TEC↓');
    expect(result).toContain('ターゲット=巨乳');
    expect(result).toContain('ターゲット=令嬢');
    expect(result).toContain('プロフィール=コキャクプロフィール1');
    expect(result).toContain('プロフィール=コキャクプロフィール2');

    // 空のターゲットは含まれないことを確認
    expect(result.match(/ターゲット=/g)?.length).toBe(2);
  });

  it('正しいINIコンテンツを生成する - 最小限のケース', () => {
    const kokyaku: Kokyaku = {
      characterType: 'コキャク',
      image: '',
      name: '',
      income: null,
      present: [''],
      targets: [null, null, null],
      profiles: ['', ''],
    };

    const result = generateKokyakuIniContent(kokyaku);

    // 期待される出力を検証
    expect(result).toContain('種類=コキャク');
    expect(result).toContain('画像=');
    expect(result).toContain('名前=');
    expect(result).toContain('インカム=');
    expect(result).not.toContain('プレゼント='); // 空のプレゼントは含まれない
    expect(result).toContain('ターゲット=');
    expect(result).toContain('プロフィール=');

    // ターゲットは3つあることを確認
    expect(result.match(/ターゲット=/g)?.length).toBe(3);

    // プロフィールは2つあることを確認
    expect(result.match(/プロフィール=/g)?.length).toBe(2);
  });

  it('プレゼント配列が正しく処理される', () => {
    // 複数のプレゼントがある場合
    const kokyakuWithPresents: Kokyaku = {
      characterType: 'コキャク',
      image: '',
      name: '',
      income: null,
      present: ['LKS↑↑', 'TEC↓', 'MNT↑'],
      targets: [null, null, null],
      profiles: ['', ''],
    };

    const result = generateKokyakuIniContent(kokyakuWithPresents);
    expect(result.match(/プレゼント=/g)?.length).toBe(3);
    expect(result).toContain('プレゼント=LKS↑↑');
    expect(result).toContain('プレゼント=TEC↓');
    expect(result).toContain('プレゼント=MNT↑');

    // 空のプレゼントがある場合
    const kokyakuWithEmptyPresents: Kokyaku = {
      characterType: 'コキャク',
      image: '',
      name: '',
      income: null,
      present: ['LKS↑↑', '', 'MNT↑'],
      targets: [null, null, null],
      profiles: ['', ''],
    };

    const resultWithEmpty = generateKokyakuIniContent(kokyakuWithEmptyPresents);
    expect(resultWithEmpty.match(/プレゼント=/g)?.length).toBe(2);
    expect(resultWithEmpty).toContain('プレゼント=LKS↑↑');
    expect(resultWithEmpty).toContain('プレゼント=MNT↑');
    // 空のプレゼントが含まれていないことを確認
    // 注: 'プレゼント='という文字列は他のプレゼントの一部として含まれるため、
    // 完全な行として'プレゼント=\n'が含まれていないことを確認する
    expect(resultWithEmpty).not.toContain('プレゼント=\n');
    expect(resultWithEmpty.split('\n').some((line) => line === 'プレゼント=')).toBe(false);
  });
});
