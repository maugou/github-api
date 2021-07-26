import React from 'react';
import { ActivityIndicator } from 'react-native';

interface Props {
  isBottomLoading: boolean;
}

export const ListFooterComponent: React.FC<Props> = props => {
  return props.isBottomLoading ? (
    <ActivityIndicator size="large" color="rgb(70, 70, 70)" />
  ) : null;
};
