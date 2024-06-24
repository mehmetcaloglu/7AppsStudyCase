// src/App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from './src/screens/HomeScreen';

const queryClient = new QueryClient();

export default function App ()
{
  return (
    <QueryClientProvider client={ queryClient }>
      <HomeScreen />
    </QueryClientProvider>
  );
}
