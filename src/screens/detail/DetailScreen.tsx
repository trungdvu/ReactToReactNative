import { NavigationHeader } from 'components';
import { EventEmitterName } from 'consts';
import { PersonModel } from 'models';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EventEmitterService } from 'services';
import { favoriteLocalStorage, navigationViewModel } from 'shared';
import { Theme } from 'theme';

export const DetailScreen = ({ route }: any): JSX.Element => {
  const person: PersonModel = navigationViewModel.getRouteParams(route).person;
  // Initially get the favorite state from local storage
  const [isFavorite, setIsFavorite] = useState(
    favoriteLocalStorage.isFavorite(person.name)
  );

  const onPressStar = () => {
    if (isFavorite) {
      favoriteLocalStorage.unmarkFavorite(person.name);
    } else {
      favoriteLocalStorage.markFavorite(person.name);
    }

    setIsFavorite(favoriteLocalStorage.isFavorite(person.name));
    EventEmitterService.send(EventEmitterName.favoritePeopleChanged);
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader
        leftType="arrowLeft"
        title="Detail"
        onPressLeftButton={() => {
          navigationViewModel.goBack();
        }}
      />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={onPressStar}
          style={{
            ...Theme.styles.centerContent,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: 60,
            paddingHorizontal: Theme.dimens.pad,
          }}
        >
          <Text>{person.name}</Text>
          {Theme.fontAwesomes.star(
            34,
            isFavorite ? Theme.colors.brand : Theme.colors.disable1
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
