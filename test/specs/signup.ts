import { expect } from "@wdio/globals";
import login from "../../utils/loginuser";

// Tester Credentials
const user = "carlo";

describe("Account Activation", async function () {
  before(async function () {
    await browser.maximizeWindow();
    await login.loginToPayMongo(user);
  });

  it("", async function () {
    console.log("It went here.");
    expect(1).toBe(1);
  });
});
