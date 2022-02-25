import React, { ReactNode } from 'react';
import { Route } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { logdfunc } from 'shared';
import { Theme } from 'theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { I18nService, keys } from 'services';

const scale = Theme.dimens.screenWid / 375;
const fontSize = scale * 8;
const iconSize = scale * 20;

interface Props {
  state: any;
  navigation: any;
  height: number;
}
export function MainTabBar({ height, state, navigation }: Props): JSX.Element {
  // For avoid notch at the bottom
  const safeInset = useSafeAreaInsets();
  const onPress = (route: Route<string>, idx: number): void => {
    const isFocused = state.index === idx;
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }

    logdfunc(MainTabBar, `onPress at ${route.name} index: ${idx}`);
  };

  const renderTabIcon = (name: string, focused: boolean): ReactNode => {
    const color = focused ? Theme.colors.brand : Theme.colors.grey1;

    switch (name) {
      case 'HomeTab':
        return Theme.fontAwesomes.home(iconSize, color);
      case 'FavoriteTab':
        return Theme.fontAwesomes.star(iconSize, color);
      default:
        return <View />;
    }
  };

  const renderTabBarButton = (route: Route<string>, idx: number): ReactNode => {
    const currentIndex = state.index;
    const focused = currentIndex === idx;
    const titles = {
      HomeTab: I18nService.t(keys.home.home),
      FavoriteTab: I18nService.t(keys.home.favorite),
    } as { [key: string]: any };

    return (
      <TouchableOpacity
        key={route.name}
        style={{ flex: 1, ...Theme.styles.centerContent }}
        onPress={(): void => onPress(route, idx)}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Icon */}
          {renderTabIcon(route.name, focused)}
          {/* Title */}
          <Text
            style={{
              fontSize,
              color: focused ? Theme.colors.brand : Theme.colors.dark100,
              marginTop: 8,
            }}
          >
            {titles[route.name]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderBackgroundNavBar = (): ReactNode => {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: Theme.colors.primaryBg,
        }}
      ></View>
    );
  };

  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
      {renderBackgroundNavBar()}
      <View style={{ marginBottom: safeInset.bottom, height }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {state.routes.map(renderTabBarButton)}
        </View>
      </View>
    </View>
  );
}
