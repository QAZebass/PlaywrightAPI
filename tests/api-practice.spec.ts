import { json } from "stream/consumers";
import { test, expect } from "../fixtures/test-setup";
import { userInformation } from '../utils/staticData/staticData.json';
import { faker } from "@faker-js/faker";


test.describe("Practising API testing in Playwright", async () => {
  test.beforeAll("Creating user", async ({ apiClass }) => {
    const email = "eve.holt@reqres.in";
    const password = faker.internet.password();
    await apiClass.createUserApi(email, password).then(createUserResponse => {
      expect(createUserResponse.status()).toEqual(200);
    });
    await apiClass.logInApi(email, password).then(logInResponse => {
      expect(logInResponse.status()).toEqual(200);
    });
  });
  test.afterAll("Deleting user", async ({ apiClass }) => {
    await apiClass.deleteUser().then((deleteUserResponse) => {
      expect(deleteUserResponse.status()).toEqual(204);
    });
  });

  test("Updating users information", async ({ apiClass, apiCheckers }) => {

    const updateUserResponse = await apiClass.updateUser(userInformation.name, userInformation.job);
    expect(updateUserResponse.status()).toEqual(200);
    const jsonResponse = await updateUserResponse.json();
    await apiCheckers.checkCorrectSchema('./schemas/updateUserSchema.json', jsonResponse);

  });
});
