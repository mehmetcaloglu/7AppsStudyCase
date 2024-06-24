import React from 'react';
import { FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Character } from '../types';
import ListItem from './ListItem';

interface CharacterListProps
{
    data: Character[] | undefined;
    query: string;
    isLoading: boolean;
    error: any;
    handleSelectCharacter: ( character: Character ) => void;
}

const CharacterList: React.FC<CharacterListProps> = ( { data, query, isLoading, error, handleSelectCharacter } ) =>
{

    if ( isLoading ) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if ( error ) {
        return <Text style={ styles.errorText }>Error loading characters</Text>;
    }

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
        <FlatList<Character>
            data={ data }
            keyExtractor={ ( item ) => item.id.toString() }
            renderItem={ ( { item } ) => (
                <ListItem item={ item } query={ query } handleSelectCharacter={ handleSelectCharacter } highlightText={ highlightText } />
            ) }
        />
    );
};

const styles = StyleSheet.create( {
    errorText: {
        color: 'red',
    },
} );

export default CharacterList;
