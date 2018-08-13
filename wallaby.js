module.exports = function(wallaby) {
  const testPathExp = 'src/**/*.test.ts?(x)';

  return {
    files: [
      'tsconfig.json',
      'tsconfig.test.json',
      'src/**/*.+(js|jsx|ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      `!${testPathExp}`,
    ],

    tests: [testPathExp],

    env: {
      type: 'node',
      runner: 'node',
    },

    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app'],
      }),
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'React',
      }),
    },

    setup: wallaby => {
      const jestConfig = require('react-scripts-ts/scripts/utils/createJestConfig')(p => require.resolve('react-scripts-ts/' + p));
      Object.keys(jestConfig.transform || {}).forEach(k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k]);
      delete jestConfig.testEnvironment;
      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest',
  };
};