const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            //This is where we override LESS global variables
            modifyVars: { '@font-family': "'IBM Plex Sans', sans-serif" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
