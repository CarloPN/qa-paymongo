import { expect } from "@wdio/globals";
import login from "../../utils/loginuser";
import dashboard from "../pageobjects/dashboard-page";
import config from "../../config/config";
const tc_data = config.data;
const urls = config.urls.urls;

// Tester Credentials
const user = "carlo";

describe("Account Activation", async function () {
  before(async function () {
    await browser.maximizeWindow();
    await login.loginToPayMongo(user);
  });

  it("TC_ACTIVATE_001 Verify that the links are working correctly for Step 1", async function () {
    let data = tc_data.TC_ACTIVATE_001;
    await browser.url(urls.activateUrl);
    await dashboard.backToStep1Activation();
    const documentUrl = await dashboard.verifyLink(data.links.link1.text);
    const restrictedBusinessUrl = await dashboard.verifyLink(
      data.links.link2.text
    );
    // Verify that the documents link redirects to Required Documents to Activate Account
    expect(documentUrl).toBe(data.links.link1.url);
    // Verify that the Restricted Businesses link redirects to a page that lists all restricted businesses
    expect(restrictedBusinessUrl).toBe(data.links.link2.url);
    // Finish Step 1 by clicking Next button
    await dashboard.clickButton("Next");
  });

  it("Verify that result has already been processed", async function () {
    let data = tc_data.TC_ACTIVATE_002;
    const textExists: boolean = await dashboard.verifyTextExists(data.text);
    // Verify that result has already been processed
    expect(textExists).toBeTruthy();
    // Click Next button
    await dashboard.clickButton("Next");
  });
});
