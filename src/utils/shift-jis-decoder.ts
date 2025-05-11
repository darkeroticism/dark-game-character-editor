/**
 * Shift-JISエンコードされたファイルを読み込み、UTF-8文字列に変換する関数
 */
import * as Encoding from 'encoding-japanese';

/**
 * Shift-JISエンコードされたファイルを読み込み、UTF-8文字列に変換する関数
 * @param file 読み込むファイル
 * @returns Promise<string> デコードされたUTF-8文字列
 */
export const readFileAsShiftJIS = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target || !event.target.result) {
          reject(new Error('ファイルの読み込みに失敗しました'));
          return;
        }
        
        // ArrayBufferとして読み込む
        const arrayBuffer = event.target.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Shift-JISからUnicodeに変換
        const unicodeArray = Encoding.convert(uint8Array, {
          to: 'UNICODE',
          from: 'SJIS',
        });
        
        // Unicodeコードポイント配列から文字列に変換
        const text = Encoding.codeToString(unicodeArray);
        resolve(text);
      } catch (e) {
        console.error('Shift-JIS変換エラー:', e);
        reject(e);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('ファイルの読み込みに失敗しました'));
    };
    
    // ArrayBufferとしてファイルを読み込む
    reader.readAsArrayBuffer(file);
  });
};
