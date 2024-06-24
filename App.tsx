import React from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App ()
{
  return (
    <QueryClientProvider client={ queryClient }>
      <SafeAreaView style={ { flex: 1 } }>
        <HomeScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
