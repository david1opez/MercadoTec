import 'dotenv/config';

export default {
  expo: {
    name: 'MercadoTec',
    scheme: 'mercadotec',
    slug: 'mercado-tec',
    version: '1.1.2',
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
      permissions: [
        "CAMERA",
      ]
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
      APIURL: process.env.APIURL,
      ALGOLIAAPPID: process.env.ALGOLIAAPPID,
      ALGOLIAAPIKEY: process.env.ALGOLIAAPIKEY,
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
