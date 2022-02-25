import { PrimaryButton } from 'components';
import { ScreenName } from 'consts';
import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { I18nService, keys } from 'services';
import { appLocalSettings, navigationViewModel } from 'shared';
import { Theme } from 'theme';

export const OnboardingScreen = ({}): JSX.Element => {
  const onPressStart = () => {
    appLocalSettings.didShowOnboarding = true;
    appLocalSettings.save();
    navigationViewModel.replace(ScreenName.Home);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <Header />
      <PrimaryButton
        title={I18nService.t(keys.onboarding.start)}
        style={{ margin: Theme.dimens.mar }}
        onPress={onPressStart}
      />
    </View>
  );
};
