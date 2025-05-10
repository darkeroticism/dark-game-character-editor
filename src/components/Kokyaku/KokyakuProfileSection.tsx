import { Box, Title, Text } from '@mantine/core';
import { KokyakuProfileInput } from './KokyakuProfileInput';
import styles from '../styles/Title.module.css';

type KokyakuProfileSectionProps = {
  profiles: (string | null)[];
  onChange: (value: string | null, index: number) => void;
  errors?: (string | undefined)[];
};

export const KokyakuProfileSection = ({
  profiles,
  onChange,
  errors,
}: KokyakuProfileSectionProps) => {
  // プロフィール変更ハンドラー
  const handleProfileChange = (value: string, index: number) => {
    onChange(value, index);
  };

  // プロフィールのランダム設定変更ハンドラー
  const handleProfileRandomChange = (isRandom: boolean, index: number) => {
    onChange(isRandom ? null : '', index);
  };

  // プロフィールがランダム設定かどうかを判定
  const isProfileRandom = (index: number): boolean => {
    if (!profiles) return true;
    return profiles[index] === null;
  };

  return (
    <Box>
      <Box mb="xs">
        <Title order={3} className={styles.blackYellowTitle}>
          プロフィール
        </Title>
        <Text size="sm">最大2行、各行6文字までです。未入力の場合「空欄（なし）」となります</Text>
      </Box>
      {(profiles || []).map((profile, index) => (
        <KokyakuProfileInput
          key={index}
          value={profile}
          onChange={handleProfileChange}
          index={index}
          placeholder={`${index + 1}行目`}
          isRandom={isProfileRandom(index)}
          onRandomChange={handleProfileRandomChange}
          error={errors?.[index]}
        />
      ))}
    </Box>
  );
};
