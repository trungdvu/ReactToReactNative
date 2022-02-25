import { NavigationHeader, PersonRow, SearchBar } from 'components';
import { EventEmitterName, ScreenName } from 'consts';
import { Observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EventEmitterService } from 'services';
import { logd, navigationViewModel } from 'shared';
import { Theme } from 'theme';
import { FavoriteViewModel } from './favorite-view-model';

export const FavoriteTab = ({}): JSX.Element => {
  const [viewModel] = useState(new FavoriteViewModel());
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    viewModel.getFavoritePeople();
    EventEmitterService.subscribe(EventEmitterName.favoritePeopleChanged, () =>
      viewModel.getFavoritePeople()
    );

    return () => {
      EventEmitterService.unsubscribe(EventEmitterName.favoritePeopleChanged);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationHeader title="Favorite People" />
      <SearchBar
        style={{ marginHorizontal: 20 }}
        value={searchText}
        onSearchText={(value): void => {
          logd('HomeTab', `searchText: ${value}`);
          setSearchText(value);
          viewModel.searchByName(value);
        }}
      />
      {/* Wrap Flatlist insdie Observer so each time people change, it will re-render this element only */}
      <Observer>
        {() => {
          const { people } = viewModel;
          return (
            <FlatList
              style={{ flex: 1, width: '100%' }}
              data={people}
              keyExtractor={(_, index) => `${index}`}
              renderItem={({ item }) => (
                <PersonRow
                  person={item}
                  onPress={() => {
                    navigationViewModel.navigate(ScreenName.Detail, {
                      person: item,
                    });
                  }}
                />
              )}
            />
          );
        }}
      </Observer>
      <Observer>
        {(): JSX.Element => {
          const { isLoading } = viewModel;
          if (isLoading === false) return <View />;
          return (
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator
                color={Theme.colors.dark100}
                size="large"
                animating={true}
              />
            </View>
          );
        }}
      </Observer>
    </View>
  );
};
