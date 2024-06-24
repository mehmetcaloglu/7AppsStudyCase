import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRickAndMortyAPI } from '../hooks/useApi';

interface Character
{
    id: number;
    name: string;
}

export default function MultiSelectAutocomplete ()
{
    const [ query, setQuery ] = useState( '' );
    const [ selectedCharacters, setSelectedCharacters ] = useState<Character[]>( [] );
    const { data, isLoading, error } = useRickAndMortyAPI( query );

    const handleSelectCharacter = ( character: Character ) =>
    {
        if ( selectedCharacters.find( ( c ) => c.id === character.id ) ) {
            setSelectedCharacters( selectedCharacters.filter( ( c ) => c.id !== character.id ) );
        } else {
            setSelectedCharacters( [ ...selectedCharacters, character ] );
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Search for characters"
                value={ query }
                onChangeText={ setQuery }
                style={ styles.input }
            />
            { isLoading && <ActivityIndicator size="large" color="#0000ff" /> }
            { error && <Text style={ styles.errorText }>Error loading characters</Text> }
            { data && (
                <FlatList
                    data={ data.results }
                    keyExtractor={ ( item ) => item.id.toString() }
                    renderItem={ ( { item } ) => (
                        <TouchableOpacity style={ styles.item } onPress={ () => handleSelectCharacter( item ) }>
                            <Text style={ styles.itemText }>{ item.name }</Text>
                        </TouchableOpacity>
                    ) }
                />
            ) }
            <View style={ styles.selectedContainer }>
                { selectedCharacters.map( ( character ) => (
                    <Text key={ character.id } style={ styles.selectedItem }>
                        { character.name }
                    </Text>
                ) ) }
            </View>
        </View>
    );
}

const styles = StyleSheet.create( {
    input: {
        borderWidth: 1,
        padding: 8,
        marginVertical: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
    errorText: {
        color: 'red',
    },
    selectedContainer: {
        marginTop: 20,
    },
    selectedItem: {
        fontSize: 16,
        backgroundColor: '#ddd',
        padding: 5,
        marginVertical: 2,
    },
} );
