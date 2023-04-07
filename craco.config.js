const CracoAntDesignPlugin = require('craco-antd');

process.env.BROWSER = 'none';

const site = process.env.REACT_APP_TENANT || 'SFTT';

const themeOverride =
  site === 'CAMBRIDGE'
    ? {
        '@light-green': '#569bc3',
        '@mid-green': '#2e5b80',
        '@dark-green': '#1a4b68',
      }
    : {};

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: themeOverride,
      },
    },
  ],
  babel: {
    presets: [],
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          namespace: 'speak-for-the-trees',
        },
      ],
    ],
  },
};
