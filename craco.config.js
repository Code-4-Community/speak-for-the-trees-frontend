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
              '@text-grey': '#AFAEAE',
              '@header-grey': '#F5F5F5',
              '@light-green': '#9AC356',
              '@mid-green': '#61802E',
              '@dark-green': '#3A681A',
              '@black': '#000000',
              '@font-family': "'IBM Plex Sans', sans-serif",
              '@heading-color': '@mid-green',
              '@heading-color-secondary': '@dark-green',
              '@text-color': '@black',
              '@text-color-secondary': '@mid-green',
              '@link-color': '@mid-green', 
              '@line-height-base': '2.15',
              '@font-size-base': '13px',
              '@font-weight-base': '400',
              '@layout-header-background': '@header-grey',
              '@layout-header-color': '@black',
              '@btn-primary-bg': '@light-green',
              '@border-radius-base': '4px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
