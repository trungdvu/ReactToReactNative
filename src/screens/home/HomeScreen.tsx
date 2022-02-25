import React from 'react';
import { View } from 'react-native';
import { MainTabBar } from 'components/MainTabbar';
import { FavoriteTab } from './FavoriteTab';
import { HomeTab } from './HomeTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const heiTabbar = 60;

export const HomeScreen = ({}): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        backBehavior="none"
        screenOptions={{ headerShown: false }}
        sceneContainerStyle={{ marginBottom: heiTabbar }}
        tabBar={(props: any): any => (
          <MainTabBar {...props} height={heiTabbar} />
        )}
      >
        <Tab.Screen name="HomeTab" component={HomeTab} />
        <Tab.Screen name="FavoriteTab" component={FavoriteTab} />
      </Tab.Navigator>
    </View>
  );
};
