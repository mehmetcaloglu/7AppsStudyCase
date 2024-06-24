import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import MultiSelectAutocomplete from '../components/MultiSelectAutoComplete';

export default function HomeScreen ()
{
    return (
        <SafeAreaView style={ styles.container }>
            <MultiSelectAutocomplete />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingTop: 32,
        padding: 10,
        backgroundColor: '#fff',
    },
} );
