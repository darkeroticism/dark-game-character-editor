import styles from '../styles/slanted-background.module.css';

type Type = 'header' | 'normal' | 'footer';

type Props = {
  children: React.ReactNode;
  type: Type;
};

export const SlantedBackground = ({ children, type = 'normal' }: Props) => {
  const typeClassNames: Record<Type, string> = {
    header: styles.slantedHeaderBG,
    normal: styles.slantedNormalBG,
    footer: styles.slantedFooterBG,
  };

  return (
    <div className={`${styles.slantedBG} ${typeClassNames[type]}`}>
      <div>{children}</div>
    </div>
  );
};
