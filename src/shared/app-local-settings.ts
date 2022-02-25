import { LocalStorageService } from 'services';
import { logd, toJSONStr } from './log';

const TAG = 'APPLocalSettings';

class AppLocalSettings extends LocalStorageService {
  private static instance: AppLocalSettings;

  didShowOnboarding = false;

  public static shareInstance(): AppLocalSettings {
    if (!AppLocalSettings.instance) {
      AppLocalSettings.instance = new AppLocalSettings();
    }

    return AppLocalSettings.instance;
  }

  async load(): Promise<void> {
    await super.load();
    logd(TAG, `load: ${toJSONStr(this)}`);
  }
}

/**
 * Contain local settings which are not stored on server. It is often in settings screen
 */
export const appLocalSettings = AppLocalSettings.shareInstance();
