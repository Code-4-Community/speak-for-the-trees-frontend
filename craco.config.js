const CracoAntDesignPlugin = require('craco-antd');
process.env.BROWSER = "none";
module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
        },
      },
    },
  ],
  babel: {
    presets: [],
    plugins: [['babel-plugin-styled-components', {
      namespace: 'scaffold',
    }]],
  },
};
