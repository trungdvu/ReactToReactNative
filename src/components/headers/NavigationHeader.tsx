import React, { ReactNode } from 'react';
import { ViewStyle, View, StatusBar, TouchableOpacity } from 'react-native';
import { Theme } from 'theme';
import { Text } from 'react-native';

export type NavButtonType = 'arrowLeft';

interface PropsType {
  style?: ViewStyle;
  title?: string;
  leftType?: NavButtonType;
  onPressLeftButton?: (NavButtonType?: NavButtonType) => void;
  barStyle?: null | 'dark-content' | 'default' | 'light-content';
}

const ICON_SIZE = 24;
const HEI_NAVIGATION = 60;
const WID_BUTTON = 36;
const MAR_LR = 12;
const COLOR = Theme.colors.black;

export const NavigationHeader = ({
  style,
  title,
  leftType,
  onPressLeftButton,
  barStyle,
}: PropsType): JSX.Element => {
  const renderButton = (
    type: NavButtonType,
    color: string,
    size: number,
    onPress?: () => void
  ): ReactNode => {
    let content: any = undefined;
    if (type == 'arrowLeft') {
      content = Theme.fontAwesomes.chevronLeft(size, color);
    }

    return (
      <TouchableOpacity
        key={`${type}`}
        style={{
          width: WID_BUTTON,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}
      >
        {content}
      </TouchableOpacity>
    );
  };

  const renderLeftButton = (): ReactNode => {
    if (leftType === undefined) return undefined;

    return (
      <View
        style={[
          {
            position: 'absolute',
            left: MAR_LR,
            flexDirection: 'row',
            top: 0,
            height: '100%',
          },
        ]}
      >
        {renderButton(leftType, COLOR, ICON_SIZE, (): void => {
          if (onPressLeftButton) onPressLeftButton(leftType);
        })}
      </View>
    );
  };

  return (
    <View style={[{ height: HEI_NAVIGATION }, style]}>
      {barStyle !== null && (
        <StatusBar
          barStyle={barStyle || 'dark-content'}
          hidden={false}
          translucent={false}
        />
      )}
      <View
        style={[
          {
            flex: 1,
            marginHorizontal: WID_BUTTON + MAR_LR,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {title || ''}
        </Text>
      </View>
      {renderLeftButton()}
    </View>
  );
};
