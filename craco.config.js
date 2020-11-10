const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            //This is where we override LESS global variables
            modifyVars: {
              '@font-family': "'IBM Plex Sans', sans-serif",
              '@link-color': '#61802E', 
              '@heading-color': '#61802E',
              '@heading-color-secondary': '3A681A',
              '@text-color': '#000000',
              '@text-color-secondary': '#61802E',
              '@success-color': '#AFAEAE', //As far as I know we do not have special success text, setting to grey
              '@line-height-base': '2.15',
              '@font-size-base': '13px',
              '@font-weight-base': '400',
              '@layout-header-background': '#F5F5F5',
              '@layout-header-color': '#000000',
              '@btn-primary-bg': '#9AC356',
              '@border-radius-base': '4px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
