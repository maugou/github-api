import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingView = () => {
  return (
    <ActivityIndicator
      style={styles.container}
      size="large"
      color="rgb(70, 70, 70)"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
});
