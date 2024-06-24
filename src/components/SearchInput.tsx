import React from 'react';
import { View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Character } from '../types';
import SelectedCharacter from './SelectedCharacters';

interface SearchInputProps
{
    query: string;
    setQuery: ( query: string ) => void;
    selectedCharacters: Character[];
    handleSelectCharacter: ( character: Character ) => void;
}

const SearchInput: React.FC<SearchInputProps> = ( { query, setQuery, selectedCharacters, handleSelectCharacter } ) =>
{
    return (
        <View style={ styles.inputContainer }>
            <ScrollView horizontal contentContainerStyle={ styles.selectedContainer } showsHorizontalScrollIndicator={ false }>
                { selectedCharacters.map( ( character ) => (
                    <SelectedCharacter
                        key={ character.id }
                        character={ character }
                        handleSelectCharacter={ handleSelectCharacter }
                    />
                ) ) }
                <TextInput
                    placeholder="Search for characters"
                    value={ query }
                    onChangeText={ setQuery }
                    style={ styles.input }
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create( {
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 12,
        marginBottom: 10,
        borderRadius: 4,
    },
    input: {
        flex: 1,
        minWidth: 100,
    },
    selectedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    selectedItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        padding: 5,
        marginRight: 5,
        borderRadius: 4,
    },
    selectedText: {
        fontSize: 16,
    },
    removeText: {
        marginLeft: 8,
        color: 'red',
    },
} );

export default SearchInput;
