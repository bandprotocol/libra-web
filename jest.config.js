module.exports = {
  roots: ['<rootDir>/test'],
  modulePaths: ['<rootDir>/packages'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/test(/(integration|unit))?/.*\\.test\\.ts$',
}
