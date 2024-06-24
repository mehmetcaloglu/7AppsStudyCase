


import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import { useRickAndMortyAPI } from '../hooks/useApi';

interface Character
{
    id: number;
    name: string;
    image: string;
    episode: string[];
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

    const highlightText = ( text: string, highlight: string ) =>
    {
        const parts = text.split( new RegExp( `(${ highlight })`, 'gi' ) );
        return (
            <Text>
                { parts.map( ( part, index ) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <Text key={ index } style={ { fontWeight: 'bold' } }>
                            { part }
                        </Text>
                    ) : (
                        part
                    )
                ) }
            </Text>
        );
    };

    return (
        <View style={ styles.container }>
            <View style={ styles.inputContainer }>
                <ScrollView horizontal contentContainerStyle={ styles.selectedContainer } showsHorizontalScrollIndicator={ false } >
                    { selectedCharacters.map( ( character ) => (
                        <View key={ character.id } style={ styles.selectedItemContainer }>
                            <Text style={ styles.selectedText }>{ character.name }</Text>
                            <TouchableOpacity onPress={ () => handleSelectCharacter( character ) }>
                                <Text style={ styles.removeText }>✕</Text>
                            </TouchableOpacity>
                        </View>
                    ) ) }
                    <TextInput
                        placeholder="Search for characters"
                        value={ query }
                        onChangeText={ setQuery }
                        style={ styles.input }
                    />
                </ScrollView>
            </View>
            { isLoading && <ActivityIndicator size="large" color="#0000ff" /> }
            { error && <Text style={ styles.errorText }>Error loading characters</Text> }
            { data && (
                <FlatList<Character>
                    data={ [ ...data.results as Character[] ] }
                    keyExtractor={ ( item ) => item.id.toString() }
                    renderItem={ ( { item }: { item: Character; } ) => (
                        <TouchableOpacity style={ styles.item } onPress={ () => handleSelectCharacter( item ) }>
                            <Image source={ { uri: item.image } } style={ styles.image } />
                            <View style={ styles.textContainer }>
                                <Text style={ styles.itemText }> { highlightText( item.name, query ) }</Text>
                                <Text style={ styles.episodeText }>Episodes: { item.episode.length }</Text>
                            </View>
                        </TouchableOpacity>
                    ) }
                />
            ) }
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 6,
    },
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
    item: {
        flexDirection: 'row',
        padding: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
    },
    episodeText: {
        fontSize: 14,
        color: 'gray',
    },
    errorText: {
        color: 'red',
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
