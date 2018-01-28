const makeWebpackConfig = require('../webpack.config.js');

module.exports = (storybookBaseConfig, env, configType) => {
  const webpackConfig = makeWebpackConfig(env);
  storybookBaseConfig.resolve = webpackConfig.resolve;
  webpackConfig.plugins.forEach(plugin => {
    storybookBaseConfig.plugins.push(plugin);
  });
  storybookBaseConfig.module = webpackConfig.module;
  return storybookBaseConfig;
};

