import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Character } from '../types';

interface SelectedCharacterProps
{
    character: Character;
    handleSelectCharacter: ( character: Character ) => void;
}

const SelectedCharacter: React.FC<SelectedCharacterProps> = ( { character, handleSelectCharacter } ) =>
{
    return (
        <View key={ character.id } style={ styles.selectedItemContainer }>
            <Text style={ styles.selectedText }>{ character.name }</Text>
            <TouchableOpacity onPress={ () => handleSelectCharacter( character ) }>
                <Text style={ styles.removeText }>✕</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create( {
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
        marginRight: 5,
    },
    removeText: {
        color: 'red',
    },
} );

export default SelectedCharacter;
