import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Character } from '../types';

interface ListItemProps
{
    item: Character;
    query: string;
    handleSelectCharacter: ( character: Character ) => void;
    highlightText: ( text: string, highlight: string ) => JSX.Element;
}

const ListItem: React.FC<ListItemProps> = ( { item, query, handleSelectCharacter, highlightText } ) =>
{
    return (
        <TouchableOpacity style={ styles.item } onPress={ () => handleSelectCharacter( item ) }>
            <Image source={ { uri: item.image } } style={ styles.image } />
            <View style={ styles.textContainer }>
                <Text style={ styles.itemText }>{ highlightText( item.name, query ) }</Text>
                <Text style={ styles.episodeText }>Episodes: { item.episode.length }</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create( {
    item: {
        flexDirection: 'row',
        padding: 10,
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
} );

export default ListItem;
