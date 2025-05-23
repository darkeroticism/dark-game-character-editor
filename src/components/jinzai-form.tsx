import {
  Jinzai,
  initialRankParamter,
  maxNameCount,
  maxProfileLineLengthForJinzai,
} from '../dohna-dohna/data';
import { Attribute } from '../dohna-dohna/attribute';
import { JinzaiErrors } from '../hooks/use-character-state';
import { Stack } from '@mantine/core';
import { ImageSection } from './image-section';
import { NameSection } from './name-section';
import { ParameterSlider } from './parameter-slider';
import { AttributeSection } from './jinzai/attribute-section';
import { VirginSection } from './jinzai/virgin-section';
import { VoiceSection } from './jinzai/voice-section';
import { ProfileSection } from './jinzai/profile-section';

type JinzaiFormProps = {
  jinzai: Jinzai;
  onChange: (
    field: keyof Jinzai,
    value: string | boolean | null | number | Attribute,
    index?: number
  ) => void;
  attributes: Attribute[];
  voices: string[];
  errors: JinzaiErrors;
};

export const JinzaiForm = ({ jinzai, onChange, attributes, voices, errors }: JinzaiFormProps) => {
  // 画像変更ハンドラー
  const handleImageChange = (value: string | null) => {
    onChange('image', value);
  };

  // 名前変更ハンドラー
  const handleNameChange = (value: string | null) => {
    onChange('name', value);
  };

  // ルックス変更ハンドラー
  const handleLooksChange = (value: number | null) => {
    onChange('looks', value);
  };

  // テクニック変更ハンドラー
  const handleTechnicChange = (value: number | null) => {
    onChange('technic', value);
  };

  // メンタル変更ハンドラー
  const handleMentalChange = (value: number | null) => {
    onChange('mental', value);
  };

  // 属性変更ハンドラー
  const handleAttributeChange = (value: Attribute | null, index: number) => {
    onChange('attributes', value, index);
  };

  // 処女変更ハンドラー
  const handleVirginChange = (value: boolean | null) => {
    onChange('isVergin', value);
  };

  // 音声変更ハンドラー
  const handleVoiceChange = (value: string | null) => {
    onChange('voice', value);
  };

  // プロフィール変更ハンドラー
  const handleProfileChange = (value: string | null, index: number) => {
    onChange('profiles', value, index);
  };

  return (
    <Stack gap="xl">
      <ImageSection image={jinzai.image} onChange={handleImageChange} />

      <NameSection
        name={jinzai.name}
        onChange={handleNameChange}
        maxNameCount={maxNameCount}
        error={errors.name}
      />

      <ParameterSlider
        title="ルックス"
        value={jinzai.looks}
        onChange={handleLooksChange}
        initialValue={initialRankParamter}
      />

      <ParameterSlider
        title="テクニック"
        value={jinzai.technic}
        onChange={handleTechnicChange}
        initialValue={initialRankParamter}
      />

      <ParameterSlider
        title="メンタル"
        value={jinzai.mental}
        onChange={handleMentalChange}
        initialValue={initialRankParamter}
      />

      <AttributeSection
        attributes={jinzai.attributes}
        onChange={handleAttributeChange}
        allAttributes={attributes}
      />

      <VirginSection isVergin={jinzai.isVergin} onChange={handleVirginChange} />

      <VoiceSection voice={jinzai.voice} onChange={handleVoiceChange} voices={voices} />

      <ProfileSection
        profiles={jinzai.profiles}
        onChange={handleProfileChange}
        maxProfileLineLength={maxProfileLineLengthForJinzai}
        errors={errors.profiles}
      />
    </Stack>
  );
};
