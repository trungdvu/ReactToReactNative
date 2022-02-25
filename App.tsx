import 'react-native-gesture-handler';
import React, {ReactNode} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationScreen} from 'screens/navigation/NavigationScreen';

const App: () => ReactNode = () => {
  return (
    <SafeAreaProvider>
      <NavigationScreen />
    </SafeAreaProvider>
  );
};

export default App;
