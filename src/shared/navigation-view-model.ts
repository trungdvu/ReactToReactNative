import {ScreenName} from 'consts';
import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {logd, toJSONStr} from './log';

const TAG = 'NavigationViewModel';
class NavigationViewModel {
  private static instance: NavigationViewModel;

  private constructor() {}

  public static sharedInstance(): NavigationViewModel {
    if (!NavigationViewModel.instance) {
      NavigationViewModel.instance = new NavigationViewModel();
    }

    return NavigationViewModel.instance;
  }

  navigationRef = createNavigationContainerRef();

  private isNotReady = (): boolean => {
    if (!this.navigationRef.isReady()) {
      logd(TAG, 'navigation is not ready yet');
      return true;
    }

    return false;
  };
  /**
   * If the screen name already existed in the stack, it will pop to that screen
   * @param screen
   * @param params { data: 'to send'}. See getRouteParams function to see how to get the params
   */
  navigate = (screen: ScreenName, params?: any): void => {
    if (this.isNotReady()) return;
    logd(TAG, `navigate: ${screen} params=${toJSONStr(params)}`);
    this.navigationRef.dispatch(
      CommonActions.navigate({
        name: screen,
        params,
      }),
    );
  };

  /**
   * Replace the current screen by a screen
   */
  replace(screen: ScreenName, params?: any): void {
    logd(TAG, `replace ${screen}; params: ${toJSONStr(params)}`);
    this.navigationRef.dispatch(StackActions.replace(screen, params));
  }

  private getCurrentScreen(): ScreenName {
    const route = this.navigationRef.getCurrentRoute();
    const screenName = route?.name;
    return screenName as ScreenName;
  }

  goBack = (params?: any): void => {
    if (this.navigationRef.canGoBack()) {
      this.navigationRef.goBack();
      const screenName = this.getCurrentScreen();
      logd(
        TAG,
        `popScreen back to ${screenName} with params: ${toJSONStr(params)}`,
      );
    } else {
      logd(TAG, 'Cannot go back');
    }
  };

  // Go back to first screen in stack.
  popToTop = (): void => {
    this.navigationRef.dispatch(StackActions.popToTop());
    const screenName = this.getCurrentScreen();
    logd(TAG, `popToTop ${screenName}`);
  };

  resetWithScreen = (screen: ScreenName, params?: any): void => {
    if (this.isNotReady()) return;
    logd(TAG, `resetWithScreen: ${screen} params ${toJSONStr(params)}`);
    this.navigationRef.reset({
      index: 0,
      routes: [{name: screen, params}],
    });
  };

  resetWithScreens = (screens: ScreenName[], params?: any): void => {
    if (this.isNotReady()) return;
    let screenName = '';
    if (screens.length > 0) {
      screenName = screens[screens.length - 1];
    }

    logd(TAG, `resetWithScreens: ${screens}`);
    this.navigationRef.reset({
      index: 0,
      routes: screens.map(item => ({name: item, params})),
    });
  };

  /**
   * const {data} = navigationViewModel.getRouteParams(route). data = to send
   */
  getRouteParams = (route: any): any => {
    return route.params || {};
  };
}

export const navigationViewModel = NavigationViewModel.sharedInstance();
