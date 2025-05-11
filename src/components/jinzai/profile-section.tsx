import { Box, Title, Text } from '@mantine/core';
import { ProfileInput } from './profile-input';
import styles from '../styles/title.module.css';

type ProfileSectionProps = {
  profiles: (string | null)[];
  onChange: (value: string | null, index: number) => void;
  maxProfileLineLength: number;
  errors?: (string | undefined)[];
};

export const ProfileSection = ({
  profiles,
  onChange,
  maxProfileLineLength,
  errors,
}: ProfileSectionProps) => {
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
    return profiles[index] === null;
  };

  return (
    <Box mt="lg">
      <Box mb="xs">
        <Title order={3} className={styles.blackYellowTitle}>
          プロフィール
        </Title>
        <Text size="sm">最大3行、各行20文字までです。未入力の場合「空欄（なし）」となります</Text>
      </Box>
      {profiles.map((profile, index) => (
        <ProfileInput
          key={index}
          value={profile}
          onChange={handleProfileChange}
          index={index}
          placeholder={`${index + 1}行目`}
          isRandom={isProfileRandom(index)}
          onRandomChange={handleProfileRandomChange}
          error={errors?.[index]}
          maxCount={maxProfileLineLength}
        />
      ))}
    </Box>
  );
};
