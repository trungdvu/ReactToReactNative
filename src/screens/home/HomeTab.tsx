import { NavigationHeader, PersonRow, SearchBar } from 'components';
import { ScreenName } from 'consts';
import { Observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { logd, navigationViewModel } from 'shared';
import { Theme } from 'theme';
import { HomeViewModel } from './home-view-model';

export const HomeTab = ({}): JSX.Element => {
  const [searchText, setSearchText] = useState('');
  const [viewModel] = useState(new HomeViewModel());

  useEffect(() => {
    viewModel.getPeople();
  }, []);

  useEffect(() => {
    viewModel.searchByName(searchText);
  }, [searchText]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationHeader title="Home" />
      <SearchBar
        style={{ marginHorizontal: 20 }}
        value={searchText}
        onSearchText={(value): void => {
          logd('HomeTab', `searchText: ${value}`);
          setSearchText(value);
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
      {/* Loading while fetching api */}
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
