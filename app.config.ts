import 'dotenv/config';

export default {
  expo: {
    name: 'mercado-tec',
    scheme: 'mercado-tec',
    slug: 'mercado-tec',
    version: '0.0.1',
    orientation: 'portrait',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#C92744'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#C92744'
      },
      package: "com.david1opez.mercadotec",
    },
    extra: {
    },
  }
};
