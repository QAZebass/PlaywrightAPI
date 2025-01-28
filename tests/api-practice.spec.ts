import { test, expect } from "../fixtures/test-setup";
import { faker } from "@faker-js/faker";
import Ajv, { JSONSchemaType } from "ajv";
import * as fs from "fs";

test.describe("Practising API testing in Playwright", async () => {
  test.beforeAll("Creating user", async ({ authApi }) => {
    const email = "eve.holt@reqres.in";
    const password = faker.internet.password();
    await authApi.createUserApi(email, password);
    await authApi.logInApi(email, password);
  });
  test.afterAll("Deleting user", async ({ deleteApi }) => {
    await deleteApi.deleteUser().then((statusCode) => {
      expect(statusCode).toEqual(204);
    });
  });

  test("Updating users information", async ({ request }) => {
    const updateUserResponse = await request.put("/api/users/4", {
      data: {
        name: "Ryu Sakazaki",
        job: "Kyokugenryu Karate martial artist",
      },
    });
    const schemePath = "./schemas/updateUserSchema.json";
    const schema = JSON.parse(fs.readFileSync(schemePath, "utf-8"));
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const isValid = validate(await updateUserResponse.json());
    expect(isValid).toBeTruthy();
    if (!isValid) {
      console.log(JSON.stringify(validate.errors, null, 2));
    }
  });
});
