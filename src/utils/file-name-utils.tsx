import { CharacterType } from '../dohna-dohna/data';

export const getFileName = (type: CharacterType, name: string | null): string => {
  switch (type) {
    case 'ジンザイ':
      return name ? `ジンザイ-${name}.txt` : 'ジンザイ.txt';
    case 'コキャク':
      return name ? `コキャク-${name}.txt` : 'コキャク.txt';
    default:
      // exhaustive check
      // @link https://zenn.dev/qnighy/articles/462baa685c80e2
      throw new Error(`Unknown type: ${(type as { type: '__invalid__' }).type}`);
  }
};
