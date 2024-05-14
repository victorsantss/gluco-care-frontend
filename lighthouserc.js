/* eslint-disable */
module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'yarn build && yarn start',
    }
  },
};
