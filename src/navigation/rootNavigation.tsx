import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchRepo } from '../components/SearchRepo';
import { RepoDetail } from '../components/RepoDetail';
import { RepoBookmark } from '../components/RepoBookmark';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabRoute = () => {
  return (
    <BottomTab.Navigator tabBarOptions={{ activeTintColor: 'rgb(0, 0, 0)' }}>
      <BottomTab.Screen
        name="검색"
        component={SearchRepo}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="관심"
        component={RepoBookmark}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="star-outline" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomTabRoute}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="RepoDetail" component={RepoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
