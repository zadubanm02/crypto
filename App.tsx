import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { db } from './utils/constants';
import { DatabaseInit } from './utils/DatabaseInit';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const database = new DatabaseInit()

  useEffect(() => {
    database.init();
    db.transaction(tx=>{
      //List Table
      tx.executeSql(`CREATE TABLE IF NOT EXISTS Portfolio(
              coin_id TEXT PRIMARY KEY NOT NULL,
              value REAL
          );`
      )});
      db.transaction(tx=>{
      tx.executeSql(`CREATE TABLE IF NOT EXISTS Watchlist(
                  watchlist_id TEXT PRIMARY KEY NOT NULL,
                );`)})
      
  }, [])

  
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
}
