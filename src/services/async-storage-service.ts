import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Extend this class, it will save all properties of this class to local storage
 * Note: If a property is an observable object, overide load function and self assign its properties
 */
export class AsyncStorageService {
  static async save(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }

  static async load(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }
}
