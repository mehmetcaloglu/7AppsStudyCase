import create from 'zustand';

interface SelectedCharactersState {
  selectedCharacters: Array<{ id: number; name: string }>;
  addCharacter: (character: { id: number; name: string }) => void;
  removeCharacter: (characterId: number) => void;
}

export const useSelectedCharactersStore = create<SelectedCharactersState>((set) => ({
  selectedCharacters: [],
  addCharacter: (character) => set((state) => ({
    selectedCharacters: [...state.selectedCharacters, character],
  })),
  removeCharacter: (characterId) => set((state) => ({
    selectedCharacters: state.selectedCharacters.filter((char) => char.id !== characterId),
  })),
}));
