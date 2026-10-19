module.exports = config => config.set({
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  plugins: [require('karma-jasmine'), require('karma-chrome-launcher'), require('@angular-devkit/build-angular/plugins/karma')],
  browsers: ['ChromeHeadless'],
  customLaunchers: {CloudChromium: {base: 'ChromeHeadless', flags: ['--no-sandbox', '--disable-dev-shm-usage']}},
  reporters: ['progress'], singleRun: true
});
