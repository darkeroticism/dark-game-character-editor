/**
 * UTF-8からShift-JISに変換してダウンロードする関数
 */
import * as Encoding from 'encoding-japanese';

const download = (blob: Blob, fileName: string): void => {
  // ダウンロードリンクを作成
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  // リンクをクリックしてダウンロード
  document.body.appendChild(link);
  link.click();

  // クリーンアップ
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

/**
 * UTF-8からShift-JISに変換してダウンロードする関数
 * @param filename ダウンロードするファイル名
 * @param content ファイルの内容（UTF-8）
 */
export const downloadWithShiftJIS = (filename: string, content: string): void => {
  try {
    // encoding-japaneseライブラリを使用してUTF-8からShift-JISに変換
    // 文字列をUnicodeのコードポイント配列に変換
    const unicodeArray = Encoding.stringToCode(content);

    // UnicodeからShift-JISに変換
    const shiftJisArray = Encoding.convert(unicodeArray, {
      to: 'SJIS',
      from: 'UNICODE',
    });

    // Shift-JISバイナリ配列をUint8Arrayに変換
    const uint8Array = new Uint8Array(shiftJisArray);

    // Blobを作成（MIMEタイプを明示的にShift-JISに設定）
    const blob = new Blob([uint8Array], {
      type: 'text/plain; charset=shift_jis',
    });

    download(blob, filename);
  } catch (e) {
    console.error('Shift-JIS変換エラー:', e);

    // フォールバック: UTF-8でダウンロード
    const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });
    download(blob, filename);
    console.log('ファイルをUTF-8でダウンロードしました（フォールバック）: ' + filename);
  }
};
