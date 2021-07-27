import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchRepo } from '../components/SearchRepo';
import { WebPage } from '../components/WebPage';
import { RepoBookmark } from '../components/RepoBookmark';
import { Issues } from '../components/Issues';

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
        name="이슈"
        component={Issues}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="reader-outline" color={color} size={size} />
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
        <Stack.Screen
          name="WebPage"
          component={WebPage}
          options={{
            headerTitle: () => <Text style={styles.header}>GitHub</Text>,
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <Icon
                name="arrow-back-outline"
                size={26}
                color="rgb(70, 70, 70)"
                style={styles.backArrow}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backArrow: {
    paddingHorizontal: 14,
  },
});
