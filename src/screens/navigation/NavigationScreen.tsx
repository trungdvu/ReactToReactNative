import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenName} from 'consts';
import {navigationViewModel} from 'shared';
import {LaunchScreen} from 'screens/launch/LaunchScreen';
import {HomeScreen} from 'screens/home/HomeScreen';
import {OnboardingScreen} from 'screens/onboarding/OnboardingScreen';
import {DetailScreen} from 'screens/detail/DetailScreen';

const Stack = createStackNavigator();

// For present from bottom options={{gestureEnabled: false, ...TransitionPresets.ModalSlideFromBottomIOS}}
export const NavigationScreen = (): JSX.Element => {
  return (
    <NavigationContainer ref={navigationViewModel.navigationRef}>
      <Stack.Navigator
        initialRouteName={ScreenName.Launch}
        screenOptions={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}>
        <Stack.Screen name={ScreenName.Launch} component={LaunchScreen} />
        <Stack.Screen
          name={ScreenName.Onboarding}
          component={OnboardingScreen}
        />
        <Stack.Screen name={ScreenName.Detail} component={DetailScreen} />
        <Stack.Screen
          name={ScreenName.Home}
          component={HomeScreen}
          options={{gestureEnabled: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
