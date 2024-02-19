/*
    Login process used for decryption of encrypted account data.
    Can also be used to store more functions involving logins.
*/

import crypto from "./crypto";
import config from "../config/config";
import Login from "../test/pageobjects/login-page";
const urls = config.urls.urls;

class loginUser {
  async loginToPayMongo(profile: string) {
    const key = config.users.users[profile].key;
    const profileDetails = config.users.users[profile];
    const profileCredentials = {
      username: crypto.decryptTxt(profileDetails.email, key),
      password: crypto.decryptTxt(profileDetails.password, key),
    };
    await browser.url(urls.baseUrl);
    await Login.loginPaths(
      profileCredentials.username,
      profileCredentials.password
    );
  }
}

export default new loginUser();
