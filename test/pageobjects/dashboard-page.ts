import { $, $$ } from "@wdio/globals";
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

  async verifyErrorText(field: string) {
    const textData = await $(
      `//label[text()="${field}"]/../parent::div//p[contains(@class,"form-error")]`
    );
    const textExist: boolean = await textData.isExisting();
    if (textExist) {
      const errorText = textData.getText();
      return errorText;
    } else {
      return "No error.";
    }
  }

  async verifyPreferredBusinessHandleError(field: string) {
    const textData = await $(
      `//label[text()="${field}"]/..//following-sibling::div//p`
    );
    const textExist: boolean = await textData.isExisting();
    if (textExist) {
      const errorText = textData.getText();
      return errorText;
    } else {
      return "No error.";
    }
  }

  async verifyMultipleErrorText(field: string) {
    const textData = await $$(
      `//label[text()="${field}"]/../parent::div//p[contains(@class,"form-error")]`
    );
    let errors: Array<string> = [];
    if (textData.length === 0) {
      errors = ["No error."];
      return errors;
    }
    for (const element of textData) {
      const elementExists = await element.isExisting();
      if (elementExists) {
        const value = await element.getText();
        errors.push(value);
      } else {
        errors.push("No error.");
      }
    }
    return errors;
  }

  async clickButton(label: string) {
    const nextButton = await $(
      `//span[text()="${label}"]/parent::div/parent::button`
    );
    await nextButton.waitForDisplayed();
    await nextButton.click();
    await browser.pause(1000);
  }

  async emptyAllFields(fields: any) {
    for (const field in fields) {
      if (fields.hasOwnProperty(field)) {
        const fieldData = fields[field];
        if (field == "business_website" || field == "product_description") {
          let element: any;
          if (field == "business_website") {
            element = await $(`//*[@id="${fieldData.name}"]//input`);
          } else if (field == "product_description") {
            element = await $(`//*[@id="${fieldData.name}"]`);
          }
          await element.click();
          const websiteText: any = await element.getValue();
          for (const letter in websiteText) {
            browser.keys("\uE003");
          }
        } else {
          const textField = await $(`//*[@id="${fieldData.name}"]`);
          await textField.clearValue();
        }
      }
    }
  }

  async scanErrors(fields: any) {
    const fieldCount = Object.keys(fields).length;
    let errorCounter = 0;
    for (const field in fields) {
      if (fields.hasOwnProperty(field)) {
        const fieldData = fields[field];
        const errorCheck = await $(`//p[text()="${fieldData.blank_error}"]`);
        const errorMessageExists: boolean = await errorCheck.isExisting();
        if (errorMessageExists) {
          errorCounter++;
        }
      }
    }
    if (errorCounter == fieldCount) {
      return true;
    } else {
      return false;
    }
  }

  async clickSpan(text: string) {
    const spanElement = await $(`//span[text()="${text}"]`);
    await spanElement.waitForDisplayed();
    await spanElement.click();
  }

  async setFieldValue(fields: any, field: string, value: any) {
    if (field == "business_website" || field == "product_description") {
      let element: any;
      if (field == "business_website") {
        element = await $(`//*[@id="${fields[field].name}"]//input`);
      } else if (field == "product_description") {
        element = await $(`//*[@id="${fields[field].name}"]`);
      }
      await element.click();
      const websiteText: any = await element.getValue();
      for (const letter in websiteText) {
        browser.keys("\uE003");
      }
      for (const letter in value) {
        browser.keys(letter);
      }
    } else {
      const textField = await $(`//*[@id="${fields[field].name}"]`);
      await textField.clearValue();
      await textField.setValue(value);
    }
  }

  async setProductDescriptionField(fields: any, field: string, value: any) {
    const element = await $(`//*[@id="${fields[field].name}"]`);
    await element.click();
    const content: any = await element.getValue();
    for (const letter in content) {
      browser.keys("\uE003");
    }
    await browser.keys(value);
  }

  async setBusinessWebsiteField(fields: any, field: string, value: any) {
    const element = await $(`//*[@id="${fields[field].name}"]//input`);
    await element.click();
    const content: any = await element.getValue();
    for (const letter in content) {
      browser.keys("\uE003");
    }
    await browser.keys(value);
  }

  async getUrlDisplayed() {
    const pElement = await $(`//p[contains(text(),"https://pm.link/")]`);
    return pElement.getText();
  }
}

export default new dashboardPage();
