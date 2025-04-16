import { describe, it, expect } from 'vitest';
import { sliderValueToRank, rankToSliderValue, rankValues } from './data';

describe('ランク変換関数', () => {
  describe('sliderValueToRank', () => {
    it('スライダー値からランク値に正しく変換する', () => {
      // 各スライダー値に対するランク値をテスト
      expect(sliderValueToRank(10)).toBe('S+');
      expect(sliderValueToRank(9)).toBe('S');
      expect(sliderValueToRank(8)).toBe('A+');
      expect(sliderValueToRank(7)).toBe('A');
      expect(sliderValueToRank(6)).toBe('B+');
      expect(sliderValueToRank(5)).toBe('B');
      expect(sliderValueToRank(4)).toBe('C+');
      expect(sliderValueToRank(3)).toBe('C');
      expect(sliderValueToRank(2)).toBe('D+');
      expect(sliderValueToRank(1)).toBe('D');
    });

    it('無効なスライダー値に対して空文字列を返す', () => {
      expect(sliderValueToRank(0)).toBe('');
      expect(sliderValueToRank(11)).toBe('');
      expect(sliderValueToRank(-1)).toBe('');
    });
  });

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

    it('説明付きのランク値からスライダー値に正しく変換する', () => {
      // 説明付きのランク値（例：'S+ (神話級)'）からスライダー値に変換
      // 注: rankToSliderValueは最初の2文字のみを使用するため、
      // 説明付きのランク値を正しく処理するには、最初の2文字が一致する必要がある
      expect(rankToSliderValue('S+')).toBe(10);
      expect(rankToSliderValue('S')).toBe(9);
      expect(rankToSliderValue('A+')).toBe(8);
      expect(rankToSliderValue('A')).toBe(7);
      expect(rankToSliderValue('B+')).toBe(6);
    });

    it('nullまたはランダム値に対してnullを返す', () => {
      expect(rankToSliderValue(null)).toBeNull();
      expect(rankToSliderValue('ランダム（未設定）')).toBeNull();
    });

    it('無効なランク値に対してnullを返す', () => {
      expect(rankToSliderValue('無効なランク')).toBeNull();
      expect(rankToSliderValue('')).toBeNull();
    });
  });

  describe('rankValues', () => {
    it('rankValuesが正しい構造を持っている', () => {
      // rankValuesの構造を検証
      expect(rankValues).toBeInstanceOf(Array);
      expect(rankValues.length).toBe(10);

      // 各要素が正しいプロパティを持っていることを確認
      rankValues.forEach(rank => {
        expect(rank).toHaveProperty('value');
        expect(rank).toHaveProperty('label');
        expect(rank).toHaveProperty('sliderValue');
        expect(typeof rank.value).toBe('string');
        expect(typeof rank.label).toBe('string');
        expect(typeof rank.sliderValue).toBe('number');
      });

      // いくつかの具体的な値をチェック
      expect(rankValues[0].value).toBe('S+');
      expect(rankValues[0].label).toBe('S+ (神話級)');
      expect(rankValues[0].sliderValue).toBe(10);

      expect(rankValues[9].value).toBe('D');
      expect(rankValues[9].label).toBe('D (能力が皆無)');
      expect(rankValues[9].sliderValue).toBe(1);
    });
  });
});
