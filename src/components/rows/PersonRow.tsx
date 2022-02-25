import { PersonModel } from 'models';
import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Theme } from 'theme';

interface Props {
  style?: ViewStyle;
  person: PersonModel;
  onPress?: () => void;
}

export const PersonRow = ({ style, person, onPress }: Props): JSX.Element => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View
        style={{
          marginLeft: Theme.dimens.mar,
          flex: 1,
        }}
      >
        {/* Company name */}
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 10,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {person.name}
        </Text>

        {/* Members */}
        <Text
          style={{ color: Theme.colors.dark65, marginBottom: 10 }}
          numberOfLines={2}
        >
          {person.gender}
        </Text>
        {/* Separator */}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: Theme.colors.primaryBg,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
