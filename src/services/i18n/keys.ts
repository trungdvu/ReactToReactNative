// Make sure all keys are defined in specific translations
export type KeyType = {
  onboarding: {
    start: string;
  };
  home: {
    home: string;
    favorite: string;
  };
};

// Must be follow the rule screen.key
export const keys: KeyType = {
  onboarding: {
    start: 'onboarding.start',
  },
  home: {
    home: 'home.home',
    favorite: 'home.favorite',
  },
};
