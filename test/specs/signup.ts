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

  it("Verify that all validation works correctly for each field for Step 3", async function () {
    let error: string;
    let errors: Array<string>;
    let data = tc_data.TC_ACTIVATE_003;
    // Leave all the fields empty, click the Save changes as draft button (found at the bottom of the page)
    await dashboard.emptyAllFields(data.fields);
    await dashboard.clickButton("Next");

    // Verify that the mandatory fields have error messages below their input fields
    const allErrorsExisting: boolean = await dashboard.scanErrors(data.fields);
    expect(allErrorsExisting).toBeTruthy;

    // Set value #1 for Business store name, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "business_store_name",
      data.fields.business_store_name.value1
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.business_store_name.label
    );
    expect(error).toBe(data.fields.business_store_name.value1_error);

    // Set value #2 for Business store name, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "business_store_name",
      data.fields.business_store_name.value2
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.business_store_name.label
    );
    expect(error).toBe(data.fields.business_store_name.value2_error);

    // Set value #1 for Customer service number, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "customer_service_number",
      data.fields.customer_service_number.value1
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.customer_service_number.label
    );
    expect(error).toBe(data.fields.customer_service_number.value1_error);

    // Set value #2 for Customer service number, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "customer_service_number",
      data.fields.customer_service_number.value2
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.customer_service_number.label
    );
    expect(error).toBe(data.fields.customer_service_number.value2_error);

    // Set value #3 for Customer service number, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "customer_service_number",
      data.fields.customer_service_number.value3
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.customer_service_number.label
    );
    expect(error).toBe(data.fields.customer_service_number.value3_error);

    // Set value #4 for Customer service number, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "customer_service_number",
      data.fields.customer_service_number.value4
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.customer_service_number.label
    );
    expect(error).toBe(data.fields.customer_service_number.value4_error);

    // Set value #5 for Customer service number, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "customer_service_number",
      data.fields.customer_service_number.value5
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.customer_service_number.label
    );
    expect(error).toBe(data.fields.customer_service_number.value5_error);

    // Set value #6 for Customer service number, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "customer_service_number",
      data.fields.customer_service_number.value6
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.customer_service_number.label
    );
    expect(error).toBe(data.fields.customer_service_number.value6_error);

    // Set value #1 for Business address, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "business_address",
      data.fields.business_address.value1
    );
    await dashboard.setFieldValue(
      data.fields,
      "city_municipality",
      data.fields.city_municipality.value1
    );
    await dashboard.setFieldValue(
      data.fields,
      "zip_code",
      data.fields.zip_code.value1
    );
    await dashboard.clickButton("Next");
    errors = await dashboard.verifyMultipleErrorText(
      data.fields.business_address.label
    );

    expect(errors).toContain(data.fields.business_address.value1_error);
    expect(errors).toContain(data.fields.city_municipality.value1_error);
    expect(errors).toContain(data.fields.zip_code.value1_error);

    // Set value #2 for Business address, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "business_address",
      data.fields.business_address.value2
    );
    await dashboard.setFieldValue(
      data.fields,
      "city_municipality",
      data.fields.city_municipality.value2
    );
    await dashboard.setFieldValue(
      data.fields,
      "zip_code",
      data.fields.zip_code.value2
    );
    await dashboard.clickButton("Next");
    errors = await dashboard.verifyMultipleErrorText(
      data.fields.business_address.label
    );

    expect(errors).toContain(data.fields.business_address.value2_error);
    expect(errors).toContain(data.fields.city_municipality.value2_error);
    expect(errors).toContain(data.fields.zip_code.value2_error);

    // Set value #3 for Business address, then click Save changes as draft
    await dashboard.setFieldValue(
      data.fields,
      "business_address",
      data.fields.business_address.value3
    );
    await dashboard.setFieldValue(
      data.fields,
      "city_municipality",
      data.fields.city_municipality.value3
    );
    await dashboard.setFieldValue(
      data.fields,
      "zip_code",
      data.fields.zip_code.value3
    );
    await dashboard.clickButton("Next");
    errors = await dashboard.verifyMultipleErrorText(
      data.fields.business_address.label
    );

    expect(errors).toContain(data.fields.business_address.value3_error);
    expect(errors).toContain(data.fields.city_municipality.value3_error);
    expect(errors).toContain(data.fields.zip_code.value3_error);

    // Set value #1 for Product description and nature of your business, then click Save changes as draft
    await dashboard.setProductDescriptionField(
      data.fields,
      "product_description",
      data.fields.product_description.value1
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.product_description.label
    );
    expect(error).toBe(data.fields.product_description.value1_error);

    // Set value #2 for Product description and nature of your business, then click Save changes as draft
    await dashboard.setProductDescriptionField(
      data.fields,
      "product_description",
      data.fields.product_description.value2
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.product_description.label
    );
    expect(error).toBe(data.fields.product_description.value2_error);

    // Set value #3 for Product description and nature of your business, then click Save changes as draft
    await dashboard.setProductDescriptionField(
      data.fields,
      "product_description",
      data.fields.product_description.value3
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(
      data.fields.product_description.label
    );
    expect(error).toBe(data.fields.product_description.value3_error);

    // Set value #1 for Business website or social media, then click Save changes as draft
    await dashboard.setBusinessWebsiteField(
      data.fields,
      "business_website",
      data.fields.business_website.value1
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(data.fields.business_website.label);
    expect(error).toBe(data.fields.business_website.value1_error);

    // Set value #2 for Business website or social media, then click Save changes as draft
    await dashboard.setBusinessWebsiteField(
      data.fields,
      "business_website",
      data.fields.business_website.value2
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(data.fields.business_website.label);
    expect(error).toBe(data.fields.business_website.value2_error);

    // Set value #3 for Business website or social media, then click Save changes as draft
    await dashboard.setBusinessWebsiteField(
      data.fields,
      "business_website",
      data.fields.business_website.value3
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(data.fields.business_website.label);
    expect(error).toBe(data.fields.business_website.value3_error);

    // Set value #4 for Business website or social media, then click Save changes as draft
    await dashboard.setBusinessWebsiteField(
      data.fields,
      "business_website",
      data.fields.business_website.value4
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyErrorText(data.fields.business_website.label);
    expect(error).toBe(data.fields.business_website.value4_error);

    // Set value #1 for Preferred business handle, then click Save changes as draft

    await dashboard.setFieldValue(
      data.fields,
      "preferred_business_handle",
      data.fields.preferred_business_handle.value1
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyPreferredBusinessHandleError(
      data.fields.preferred_business_handle.label
    );
    expect(error).toBe(data.fields.preferred_business_handle.value1_error);

    // Set value #2 for Preferred business handle, then click Save changes as draft

    await dashboard.setFieldValue(
      data.fields,
      "preferred_business_handle",
      data.fields.preferred_business_handle.value2
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyPreferredBusinessHandleError(
      data.fields.preferred_business_handle.label
    );
    expect(error).toBe(data.fields.preferred_business_handle.value2_error);

    // Set value #3 for Preferred business handle, then click Save changes as draft

    await dashboard.setFieldValue(
      data.fields,
      "preferred_business_handle",
      data.fields.preferred_business_handle.value3
    );
    await dashboard.clickButton("Next");
    error = await dashboard.verifyPreferredBusinessHandleError(
      data.fields.preferred_business_handle.label
    );
    expect(error).toBe(data.fields.preferred_business_handle.value3_error);

    // Put any value in the Preferred business handle, check the URL below the field

    await dashboard.setFieldValue(
      data.fields,
      "preferred_business_handle",
      data.fields.preferred_business_handle.value3
    );
    const url = await dashboard.getUrlDisplayed();
    expect(url).toBe(data.fields.preferred_business_handle.value4_expect);

    // Click Next button
    await dashboard.clickButton("Next");
  });
});
