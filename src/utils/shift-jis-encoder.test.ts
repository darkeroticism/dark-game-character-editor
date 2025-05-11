import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { downloadWithShiftJIS } from './shift-jis-encoder';
import * as Encoding from 'encoding-japanese';

// Encodingライブラリのモック
vi.mock('encoding-japanese', () => ({
  stringToCode: vi.fn((str: string) => Array.from(str).map((c: string) => c.charCodeAt(0))),
  convert: vi.fn((arr: number[]) => arr), // 変換をシミュレート
}));

describe('shiftJisEncoder', () => {
  // DOMのモック
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let appendChildSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let removeChildSpy: any;
  let createElementOriginal: typeof document.createElement;
  let createObjectURLOriginal: typeof URL.createObjectURL;
  let revokeObjectURLOriginal: typeof URL.revokeObjectURL;

  beforeEach(() => {
    // document.createElementのモック
    createElementOriginal = document.createElement;
    document.createElement = vi.fn().mockImplementation((tagName) => {
      if (tagName === 'a') {
        return {
          href: '',
          download: '',
          click: vi.fn(),
        };
      }
      return createElementOriginal(tagName);
    });

    // URL.createObjectURLのモック
    createObjectURLOriginal = URL.createObjectURL;
    URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');

    // URL.revokeObjectURLのモック
    revokeObjectURLOriginal = URL.revokeObjectURL;
    URL.revokeObjectURL = vi.fn();

    // document.body.appendChild/removeChildのスパイ
    appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(vi.fn());
    removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(vi.fn());

    // console.logとconsole.errorのモック
    vi.spyOn(console, 'log').mockImplementation(vi.fn());
    vi.spyOn(console, 'error').mockImplementation(vi.fn());
  });

  afterEach(() => {
    // モックをリセット
    vi.restoreAllMocks();
    document.createElement = createElementOriginal;
    URL.createObjectURL = createObjectURLOriginal;
    URL.revokeObjectURL = revokeObjectURLOriginal;
  });

  describe('downloadWithShiftJIS', () => {
    it('UTF-8からShift-JISに変換してダウンロードする', () => {
      // テスト用のデータ
      const filename = 'test.txt';
      const content = 'テスト文字列';

      // 関数を実行
      downloadWithShiftJIS(filename, content);

      // Encodingライブラリが正しく呼ばれたか検証
      expect(Encoding.stringToCode).toHaveBeenCalledWith(content);
      expect(Encoding.convert).toHaveBeenCalled();

      // Blobが正しく作成されたか検証
      expect(URL.createObjectURL).toHaveBeenCalled();

      // リンク要素が正しく作成されたか検証
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();

      // URL.revokeObjectURLが呼ばれたか検証
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('エラー発生時にフォールバックとしてUTF-8でダウンロードする', () => {
      // エラーを発生させるためにEncodingライブラリのモックを変更
      vi.mocked(Encoding.convert).mockImplementationOnce(() => {
        throw new Error('変換エラー');
      });

      // テスト用のデータ
      const filename = 'error.txt';
      const content = 'エラーテスト';

      // 関数を実行
      downloadWithShiftJIS(filename, content);

      // エラーが発生してもBlobが作成されたか検証
      expect(URL.createObjectURL).toHaveBeenCalled();

      // リンク要素が正しく作成されたか検証
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();

      // URL.revokeObjectURLが呼ばれたか検証
      expect(URL.revokeObjectURL).toHaveBeenCalled();

      // console.errorが呼ばれたか検証
      expect(console.error).toHaveBeenCalled();
    });
  });
});
