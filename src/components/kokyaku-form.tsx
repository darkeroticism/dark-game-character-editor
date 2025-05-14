import { initialRankParamter, Kokyaku, maxNameCount } from '../dohna-dohna/data';
import { Attribute } from '../dohna-dohna/attribute';
import { KokyakuErrors } from '../hooks/use-character-state';
import { Stack } from '@mantine/core';
import { ImageSection } from './image-section';
import { NameSection } from './name-section';
import { ParameterSlider } from './parameter-slider';
import { PresentSection } from './kokyaku/present-section';
import { TargetSection } from './kokyaku/target-section';
import { KokyakuProfileSection } from './kokyaku/kokyaku-profile-section';

type KokyakuFormProps = {
  kokyaku: Kokyaku;
  onChange: (
    field: keyof Kokyaku,
    value: string | number | null | Attribute,
    index?: number
  ) => void;
  attributes: Attribute[];
  errors: KokyakuErrors;
};

export const KokyakuForm = ({ kokyaku, onChange, attributes, errors }: KokyakuFormProps) => {
  // 画像変更ハンドラー
  const handleImageChange = (value: string | null) => {
    onChange('image', value);
  };

  // 名前変更ハンドラー
  const handleNameChange = (value: string | null) => {
    onChange('name', value);
  };

  // インカム変更ハンドラー
  const handleIncomeChange = (value: number | null) => {
    onChange('income', value);
  };

  // プレゼント変更ハンドラー
  const handlePresentChange = (value: string | null) => {
    onChange('present', value);
  };

  // ターゲット変更ハンドラー
  const handleTargetChange = (value: Attribute | null, index: number) => {
    onChange('targets', value, index);
  };

  // プロフィール変更ハンドラー
  const handleProfileChange = (value: string | null, index: number) => {
    onChange('profiles', value, index);
  };

  return (
    <Stack gap="xl">
      <ImageSection image={kokyaku.image} onChange={handleImageChange} />

      <NameSection
        name={kokyaku.name}
        onChange={handleNameChange}
        maxNameCount={maxNameCount}
        error={errors.name}
      />

      <ParameterSlider
        title="インカム"
        value={kokyaku.income}
        onChange={handleIncomeChange}
        initialValue={initialRankParamter}
      />

      <PresentSection present={kokyaku.present} onChange={handlePresentChange} />

      <TargetSection
        targets={kokyaku.targets || []}
        onChange={handleTargetChange}
        allAttributes={attributes}
      />

      <KokyakuProfileSection
        profiles={kokyaku.profiles || []}
        onChange={handleProfileChange}
        errors={errors.profiles}
      />
    </Stack>
  );
};
