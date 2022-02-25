import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  dropShadow: {
    shadowColor: colors.dark100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
