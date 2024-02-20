import { $ } from "@wdio/globals";
import config from "../../config/config";
const data = config.data;
const url = config.urls.urls;

class dashboardPage {
  async backToStep1Activation() {
    const backButton = await $(`//section/button`);
    await backButton.waitForDisplayed();
    let buttonExists: boolean = await backButton.isExisting();
    while (buttonExists) {
      await backButton.click();
      await browser.pause(1000);
      buttonExists = await backButton.isExisting();
      if (!buttonExists) {
        const buttonToStep1 = await $(
          `//div[@class="button__content"]/parent::button/parent::div/button`
        );
        await buttonToStep1.waitForDisplayed();
        await buttonToStep1.click();
        await browser.pause(1000);
      }
    }
  }

  async verifyLink(text: string) {
    const urlLink = await $(`//a[text()="${text}"]`);
    const hrefAttribute = await urlLink.getAttribute("href");
    return hrefAttribute;
  }

  async verifyTextExists(text: string) {
    const textData = await $(`//*[contains(text(),"${text}")]`);
    const textExists: boolean = await textData.isExisting();
    return textExists;
  }

  async clickButton(label: string) {
    const nextButton = await $(
      `//span[text()="${label}"]/parent::div/parent::button`
    );
    await nextButton.waitForDisplayed();
    await nextButton.click();
    await browser.pause(1000);
  }
}

export default new dashboardPage();
