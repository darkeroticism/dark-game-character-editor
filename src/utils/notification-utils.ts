import { notifications } from '@mantine/notifications';

/**
 * 解析できなかったパラメータがある場合に表示する通知
 * @param unparseableParams 解析できなかったパラメータの配列
 */
export function showParseErrorNotification(unparseableParams: string[]): void {
  notifications.show({
    title: '一部のパラメータを解析できませんでした',
    message: `以下のパラメータは解析できなかったため、デフォルト値または空欄になっています: ${unparseableParams.join(', ')}`,
    color: 'yellow',
    autoClose: 10000, // 10秒間表示
  });
}

/**
 * ファイル読み込み成功時に表示する通知
 * @param fileName ファイル名
 */
export function showSuccessNotification(fileName: string): void {
  notifications.show({
    title: 'ファイルを読み込みました',
    message: `${fileName}を正常に読み込みました`,
    color: 'green',
  });
}

/**
 * エラー発生時に表示する通知
 * @param error エラーオブジェクト
 */
export function showErrorNotification(error: unknown): void {
  let errorMessage =
    'ファイルの読み込みに失敗しました。正しいShift-JISエンコードのテキストファイルか確認してください。';

  // エラーの種類に応じてメッセージを変更
  if (error instanceof Error) {
    if (error.message.includes('Encoding')) {
      errorMessage =
        'ファイルのエンコーディングが正しくありません。Shift-JISエンコードのテキストファイルを使用してください。';
    } else if (error.message.includes('読み込み')) {
      errorMessage =
        'ファイルの読み込み中にエラーが発生しました。ファイルが破損していないか確認してください。';
    }
  }

  notifications.show({
    title: 'ファイル読み込みエラー',
    message: errorMessage,
    color: 'red',
    autoClose: false, // 手動で閉じるまで表示
  });
}

/**
 * バリデーションエラー時に表示する通知
 * @param message エラーメッセージ
 */
export function showValidationErrorNotification(message: string): void {
  notifications.show({
    title: '入力エラー',
    message,
    color: 'red',
  });
}
