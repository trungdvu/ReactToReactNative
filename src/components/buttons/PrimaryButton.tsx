import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Theme } from 'theme';

interface Props {
  title: string;
  style?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
}

export const PrimaryButton = ({
  title,
  disabled,
  style,
  onPress,
}: Props): JSX.Element => {
  const color = Theme.colors.brand;

  return (
    <TouchableOpacity
      style={{
        height: Theme.dimens.heiButton,
        flexDirection: 'row',
        backgroundColor: disabled ? Theme.colors.disable1 : color,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={{
          color: Theme.colors.white,
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
