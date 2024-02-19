import { $ } from "@wdio/globals";
import config from "../../config/config";
const data = config.data;
const url = config.urls.urls;

class loginPage {
  async loginPaths(email: string, password: string) {
    const emailField = await $(`//input[@name="email"]`);
    const passwordField = await $(`//input[@name="password"]`);
    await emailField.setValue(email);
    await passwordField.setValue(password);
    const btn = await $(`//button[@type="submit"]`);
    await btn.click();
  }
}

export default new loginPage();
