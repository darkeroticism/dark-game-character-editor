import { voices } from '../dohna-dohna/data';
import { attributes } from '../dohna-dohna/attribute';
import { JinzaiForm } from './jinzai-form';
import { KokyakuForm } from './kokyaku-form';
import { Container } from '@mantine/core';
import { FileDropZone } from './file-drop-zone';
import { CharacterTypeSelector } from './character-type-selector';
import { GenerateFileButton } from './generate-file-button';
import { FileInputSection } from './file-input-section';
import { useCharacterState } from '../hooks/use-character-state';
import { useFileOperations } from '../hooks/use-file-operations';

export const CharacterEditor = () => {
  // カスタムフックから状態を取得
  const characterState = useCharacterState();
  const {
    characterType,
    setCharacterType,
    jinzai,
    kokyaku,
    jinzaiErrors,
    kokyakuErrors,
    handleJinzaiChange,
    handleKokyakuChange,
  } = characterState;

  // ファイル操作ロジックを取得
  const { handleFileDrop, handleGenerateFile } = useFileOperations({
    characterType,
    setCharacterType,
    jinzai,
    setJinzai: characterState.setJinzai,
    kokyaku,
    setKokyaku: characterState.setKokyaku,
    setJinzaiErrors: characterState.setJinzaiErrors,
    setKokyakuErrors: characterState.setKokyakuErrors,
    resetJinzai: characterState.resetJinzai,
    resetKokyaku: characterState.resetKokyaku,
  });

  // 現在のキャラクタータイプに基づいてフォームを表示
  const renderCharacterForm = () => {
    return characterType === 'ジンザイ' ? (
      <JinzaiForm
        jinzai={jinzai}
        onChange={handleJinzaiChange}
        attributes={attributes}
        voices={voices}
        errors={jinzaiErrors}
      />
    ) : (
      <KokyakuForm
        kokyaku={kokyaku}
        onChange={handleKokyakuChange}
        attributes={attributes}
        errors={kokyakuErrors}
      />
    );
  };

  return (
    <Container size="md" py="xl">
      <CharacterTypeSelector characterType={characterType} onChange={setCharacterType} />

      <Container p="md">
        <FileInputSection />
      </Container>
      <FileDropZone onFileDrop={handleFileDrop} />
      <Container p="md">{renderCharacterForm()}</Container>
      <GenerateFileButton onClick={handleGenerateFile} />
    </Container>
  );
};
