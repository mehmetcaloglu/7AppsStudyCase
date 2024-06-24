import { create } from 'zustand';
import { Character } from '../types';

interface StoreState
{
  selectedCharacters: Character[];
  addCharacter: ( character: Character ) => void;
  removeCharacter: ( id: number ) => void;
}

export const useStore = create<StoreState>( ( set ) => ( {
  selectedCharacters: [],
  addCharacter: ( character ) => set( ( state ) => ( {
    selectedCharacters: [ ...state.selectedCharacters, character ],
  } ) ),
  removeCharacter: ( id ) => set( ( state ) => ( {
    selectedCharacters: state.selectedCharacters.filter( ( character ) => character.id !== id ),
  } ) ),
} ) );
