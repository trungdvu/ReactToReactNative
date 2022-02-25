import { LocalStorageService } from 'services';
import { logd } from './log';

const TAG = 'favorite-local-storage';

class FavoriteLocalStorage extends LocalStorageService {
  private static instance: FavoriteLocalStorage;

  favoritePeople: string[] = [];

  public static sharedInstance(): FavoriteLocalStorage {
    if (!FavoriteLocalStorage.instance) {
      FavoriteLocalStorage.instance = new FavoriteLocalStorage();
    }

    return FavoriteLocalStorage.instance;
  }

  isFavorite(personName: string): boolean {
    return this.favoritePeople.indexOf(personName) > -1;
  }

  markFavorite(personName: string) {
    if (this.isFavorite(personName)) {
      logd(TAG, `markFavorite: ${personName} existed in the list`);
      return;
    }

    this.favoritePeople.push(personName);
    this.save();
    logd(TAG, `markFavorite ${personName} successfully`);
  }

  unmarkFavorite(personName: string) {
    const index = this.favoritePeople.indexOf(personName);
    if (index > -1) {
      this.favoritePeople.splice(index, 1);
      this.save();
      logd(TAG, `unmarkFavorite ${personName} successfully`);
    }
  }
}

/**
 * Contain local settings which are not stored on server. It is often in settings screen
 */
export const favoriteLocalStorage = FavoriteLocalStorage.sharedInstance();
