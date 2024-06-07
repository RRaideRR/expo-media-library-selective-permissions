import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';

export default function App() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (permissionResponse?.granted) {
      MediaLibrary.addListener((listener) => {
        console.log('assets changed');
      })

      return () => {
        MediaLibrary.removeAllListeners();
      }
    }

  }, [permissionResponse?.granted]);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      {!!permissionResponse?.granted ?
      <Button
        title="Select more photos"
        onPress={() => {
        if (Platform.OS === 'ios') {
          MediaLibrary.presentPermissionsPickerAsync();
          return;
        }

        if (Platform.OS === 'android') {
          requestPermission();
        }
      }}
      /> :
        <Button
          title="Request Permission"
          onPress={requestPermission}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
