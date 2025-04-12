import styles from '../styles/SlantedBackground.module.css';

type Color = 'yellow' | 'pink' | 'cyan';
type Type = 'header' | 'normal' | 'footer';

type Props = {
  children: React.ReactNode;
  mainColor: Color;
  nextColor: Color;
  type: Type;
};

export const SlantedBackground = ({ children, mainColor, nextColor, type = 'normal' }: Props) => {
  const mainColorClassNames: Record<Color, string> = {
    pink: styles.slantedBGMainColorPink,
    cyan: styles.slantedBGMainColorCyan,
    yellow: styles.slantedBGMainColorYellow,
  };

  const nextColorClassNames: Record<Color, string> = {
    pink: styles.slantedBGNextColorPink,
    cyan: styles.slantedBGNextColorCyan,
    yellow: styles.slantedBGNextColorYellow,
  };

  const typeClassNames: Record<Type, string> = {
    header: styles.slantedHeaderBG,
    normal: styles.slantedNormalBG,
    footer: styles.slantedFooterBG,
  };

  return (
    <div
      className={`${styles.slantedBG} ${mainColorClassNames[mainColor]}  ${nextColorClassNames[nextColor]} ${typeClassNames[type]}`}
    >
      <div>{children}</div>
    </div>
  );
};
