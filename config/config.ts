/**
 * Module to load environment specifci config files
 */
const environment = "uat";

class Config {
  get configUrl() {
    return require(`./env-${environment}/config.urls.${environment}.json`);
  }

  get configUsers() {
    return require(`./env-${environment}/config.users.${environment}.json`);
  }

  get configTestData() {
    return require(`./env-${environment}/config.testdata.${environment}.json`);
  }
}

const config = new Config();

export default {
  urls: config.configUrl,
  users: config.configUsers,
  data: config.configTestData,
};
