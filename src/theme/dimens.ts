import { Dimensions } from 'react-native';

export const dimens = {
  heiButton: 54,
  borderRadius: 8,
  /**
   * Often padding
   */
  pad: 8,
  /**
   * Often margin between screen and element
   */
  mar: 20,
  screenWid: Dimensions.get('window').width,
  screenHei: Dimensions.get('window').height,
};
