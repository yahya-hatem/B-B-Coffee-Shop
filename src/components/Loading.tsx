import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';

export function Loading() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loadingContainer}>
        <MaterialIcons name="local-cafe" size={55} color="#4A2C20" />
        <Text style={styles.loadingTitle}>Loading B&B Coffee...</Text>
        <Text style={styles.loadingText}>Getting the latest coffee menu.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F3ED',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F3ED',
    paddingHorizontal: 24,
  },
  loadingTitle: {
    marginTop: 18,
    color: '#4A2C20',
    fontSize: 24,
    fontWeight: '800',
  },
  loadingText: {
    marginTop: 8,
    color: '#7B5E4E',
    fontSize: 15,
  },
});
