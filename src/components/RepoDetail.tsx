import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

import { LoadingView } from './layout/LoadingView';

export const RepoDetail = () => {
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();
  const { uri } = route.params;

  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <WebView
      source={{ uri }}
      startInLoadingState={isLoading}
      onLoad={onLoad}
      renderLoading={() => <LoadingView />}
    />
  );
};
