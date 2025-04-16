import { Button, useMantineTheme } from '@mantine/core';
import { JSX, ReactNode } from 'react';

type Props = {
  isSelected: boolean;
  onClick: () => void;
  isDisabled?: boolean;
  isLastRow?: boolean;
  isLastCol?: boolean;
  color?: string;
  children: ReactNode;
};

export const SelectorButton = ({
  isSelected,
  onClick,
  isDisabled = false,
  isLastCol = false,
  isLastRow = false,
  color = 'yellow',
  children,
}: Props): JSX.Element => {
  const theme = useMantineTheme();

  return (
    <Button
      variant={isSelected ? 'filled' : 'outline'}
      color={isSelected ? (color === 'yellow' ? theme.colors.yellow[5] : color) : 'gray'}
      autoContrast={isSelected}
      onClick={onClick}
      disabled={isDisabled}
      fullWidth
      styles={{
        root: {
          height: 'auto',
          padding: '8px',
          whiteSpace: 'normal',
          textAlign: 'center',
          lineHeight: 1.2,
          borderRadius: 0,
          margin: 0,
          border: 'none',
          borderRight: isLastCol ? 'none' : '1px solid #ced4da',
          borderBottom: isLastRow ? 'none' : '1px solid #ced4da',
        },
      }}
    >
      {children}
    </Button>
  );
};
