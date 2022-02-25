import {
  faChevronLeft,
  faHome,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export class FontAwesomes {
  static home = (size: number, color: string, style?: ViewStyle): ReactNode => (
    <FontAwesomeIcon icon={faHome} size={size} color={color} style={style} />
  );

  static star = (size: number, color: string, style?: ViewStyle): ReactNode => (
    <FontAwesomeIcon icon={faStar} size={size} color={color} style={style} />
  );

  static chevronLeft = (
    size: number,
    color: string,
    style?: ViewStyle
  ): React.ReactFragment => (
    <FontAwesomeIcon
      icon={faChevronLeft}
      size={size}
      color={color}
      style={style}
    />
  );
}
