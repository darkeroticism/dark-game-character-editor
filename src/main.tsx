import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';

// ドーナドーナの公式サイトに合わせたテーマを作成
const theme = createTheme({
  primaryColor: 'pink',
  colors: {
    // ドーナドーナの公式サイトの色に合わせたカラーパレット
    // あまりprimaryとかの序列や役割は意識されておらず3色以上混ぜてビビッドなイメージを作ることを優先している
    // 強いて言うならピンクがprimary, シアンがセカンダリ、イエローがアクセントカラー
    pink: [
      '#ef90d6',
      '#ed7ecf',
      '#ea6bc8',
      '#e859c1',
      '#e546ba',
      // 公式サイトで使われているカラー
      '#ce3fa7',
      '#b73895',
      '#a03182',
      '#892a70',
      '#73235d',
    ],
    cyan: [
      '#9cf0ff',
      '#88ecff',
      '#74e9ff',
      '#60e6ff',
      '#4ce3ff',
      // 公式サイトで使われているカラー
      '#38e0ff',
      '#32cae6',
      '#2db3cc',
      '#279db3',
      '#228699',
    ],
    yellow: [
      '#fffea8',
      '#fefd97',
      '#fefd85',
      '#fefd74',
      '#fefc62',
      // 公式サイトで使われているカラー
      '#fefc51',
      '#e5e349',
      '#cbca41',
      '#b2b039',
      '#989731',
    ],
    black: [
      '#1E1E1E',
      '#191919',
      '#171717',
      '#151515',
      '#131313',
      // 公式サイトで使われているカラー
      '#111111',
      '#0F0F0F',
      '#0E0E0E',
      '#0C0C0C',
      '#0B0B0B',
    ],
    white: [
      '#fafafa',
      '#f9f9f9',
      '#f8f8f8',
      '#f7f7f7',
      '#f6f6f6',
      // 公式サイトで使われているカラー
      '#f5f5f5',
      '#e7e7e7',
      '#cdcdcd',
      '#b2b2b2',
      '#9a9a9a',
    ],
  },

  fontFamily:
    'YuGothic, Yu Gothic, "游ゴシック体", "游ゴシック", "ヒラギノ角ゴ Pro W3", Hiragino Kaku Gothic Pro, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", Osaka, MS PGothic, Arial, Helvetica, Verdana, sans-serif',
  headings: {
    fontFamily:
      'YuGothic, Yu Gothic, "游ゴシック体", "游ゴシック", "ヒラギノ角ゴ Pro W3", Hiragino Kaku Gothic Pro, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", Osaka, MS PGothic, Arial, Helvetica, Verdana, sans-serif',
    fontWeight: '700',
  },
  components: {
    SegmentedControl: {
      defaultProps: {
        color: 'pink',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </React.StrictMode>
);
