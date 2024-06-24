import React from 'react';
import { View, StyleSheet } from 'react-native';
import MultiSelectAutocomplete from '../components/MultiSelectAutoComplete';

export default function HomeScreen ()
{
    return (
        <View style={ styles.container }>
            <MultiSelectAutocomplete />
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
} );
