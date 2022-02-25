import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ViewStyle,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Theme } from 'theme';

interface Props {
  placeholder?: string;
  style?: ViewStyle;
  value: string;
  /**
   * Only trigger when user stops typing
   */
  onSearchText: (text: string) => void;
  /**
   * Hide delete button to able to clear all text.
   */
  disableClearAll?: boolean;
}

export const SearchBar = ({
  placeholder,
  style,
  value,
  disableClearAll,
  onSearchText,
}: Props): JSX.Element => {
  const [subject] = useState(new BehaviorSubject(''));
  const [text, setText] = useState(value);

  useEffect(() => {
    // each text change will go though this subject's operators and only subscribe is called correctly
    subject
      .pipe(
        map((s) => s.trim()), // map & distinct no trigger if the new value is equal
        distinctUntilChanged(), // to the old value
        debounceTime(200) // send search text if user doesn't type in 200ms
      )
      .subscribe((text) => {
        onSearchText(text);
      });

    // When the component unmounts, this will clean up the subscription
    return (): void => {
      subject.unsubscribe();
    };
  }, []);
  const handleChangeText = (text: string, forceTrigger = false): void => {
    setText(text);

    if (forceTrigger) {
      onSearchText(text);
    } else {
      subject.next(text);
    }
  };

  const handleClearText = (): void => {
    handleChangeText('', true);
  };

  const renderIcon = (): ReactNode => {
    return (
      <FontAwesomeIcon icon={faSearch} size={16} color={Theme.colors.dark65} />
    );
  };

  const renderClearIcon = (): ReactNode => {
    if (disableClearAll || value === '' || text === '') {
      return null;
    }
    return (
      <TouchableOpacity onPress={handleClearText}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          size={16}
          color={Theme.colors.dark100}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.container, style]}>
      {renderIcon()}
      <TextInput
        value={text}
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={handleChangeText}
      />
      {renderClearIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingVertical: 12,
      },
      android: {
        paddingVertical: 6,
      },
    }),
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primaryBg,
    borderRadius: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    marginHorizontal: 8,
    color: Theme.colors.dark100,
    fontSize: 14,
    includeFontPadding: false,
  },
});
