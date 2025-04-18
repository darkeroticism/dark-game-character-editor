import { describe, it, expect } from 'vitest';
import { rankToSliderValue, rankInfo } from './data';

describe('ランク変換関数', () => {

  describe('rankToSliderValue', () => {
    it('ランク値からスライダー値に正しく変換する', () => {
      // 各ランク値に対するスライダー値をテスト
      expect(rankToSliderValue('S+')).toBe(10);
      expect(rankToSliderValue('S')).toBe(9);
      expect(rankToSliderValue('A+')).toBe(8);
      expect(rankToSliderValue('A')).toBe(7);
      expect(rankToSliderValue('B+')).toBe(6);
      expect(rankToSliderValue('B')).toBe(5);
      expect(rankToSliderValue('C+')).toBe(4);
      expect(rankToSliderValue('C')).toBe(3);
      expect(rankToSliderValue('D+')).toBe(2);
      expect(rankToSliderValue('D')).toBe(1);
    });

    it('nullに対してnullを返す', () => {
      expect(rankToSliderValue(null)).toBeNull();
    });

    it('無効なランク値に対してnullを返す', () => {
      expect(rankToSliderValue('無効なランク')).toBeNull();
      expect(rankToSliderValue('')).toBeNull();
    });
  });

  describe('rankInfo', () => {
    it('rankInfoが正しい構造を持っている', () => {
      // rankInfoの構造を検証
      expect(rankInfo).toBeInstanceOf(Array);
      expect(rankInfo.length).toBe(10);

      // 各要素が正しいプロパティを持っていることを確認
      rankInfo.forEach(rank => {
        expect(rank).toHaveProperty('name');
        expect(rank).toHaveProperty('description');
        expect(rank).toHaveProperty('value');
        expect(typeof rank.name).toBe('string');
        expect(typeof rank.description).toBe('string');
        expect(typeof rank.value).toBe('number');
      });

      // いくつかの具体的な値をチェック
      expect(rankInfo[0].name).toBe('S+');
      expect(rankInfo[0].description).toBe('神話級');
      expect(rankInfo[0].value).toBe(10);

      expect(rankInfo[9].name).toBe('D');
      expect(rankInfo[9].description).toBe('能力が皆無');
      expect(rankInfo[9].value).toBe(1);
    });
  });
});
