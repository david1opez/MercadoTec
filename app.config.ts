import 'dotenv/config';

export default {
  expo: {
    name: 'Mercado Tec',
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
    notification: {
      icon: './assets/icon.png',
      color: '#C92744',
    },
    extra: {
      APIKEY: process.env.APIKEY,
      AUTHDOMAIN: process.env.AUTHDOMAIN,
      PROJECTID: process.env.PROJECTID,
      STORAGEBUCKET: process.env.STORAGEBUCKET,
      MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
      APPID: process.env.APPID,
      MEASUREMENTID: process.env.MEASUREMENTID,
      PUBLISHABLEKEY: process.env.PUBLISHABLEKEY,
      SECRETKEY: process.env.SECRETKEY
    },
    plugins: [
      [
        "@stripe/stripe-react-native",
        {
          "merchantIdentifier": "merchant.com.david1opez.mercadotec",
          "enableGooglePay": true,
        }
      ]
    ]
  }
};
