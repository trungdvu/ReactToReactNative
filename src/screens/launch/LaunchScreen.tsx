import { ScreenName } from 'consts';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  appLocalSettings,
  favoriteLocalStorage,
  navigationViewModel,
} from 'shared';

export const LaunchScreen = ({}): JSX.Element => {
  async function loadLocalData(): Promise<void> {
    // for navigation mounted
    await new Promise((resolve) => setTimeout(resolve, 20));

    await Promise.all([appLocalSettings.load(), favoriteLocalStorage.load()]);

    if (appLocalSettings.didShowOnboarding) {
      navigationViewModel.resetWithScreen(ScreenName.Home);
    } else {
      navigationViewModel.resetWithScreen(ScreenName.Onboarding);
    }
  }

  useEffect(() => {
    loadLocalData();
  }, []);
  return <View style={{ flex: 1, backgroundColor: 'red' }} />;
};
