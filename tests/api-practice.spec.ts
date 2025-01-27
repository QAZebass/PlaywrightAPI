import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import Ajv, { JSONSchemaType } from 'ajv';
import * as fs from 'fs';
test.describe("Practising API testing in Playwright", async () => {

  test.beforeAll('Creating user', async ({ request }) => {
    const email = 'eve.holt@reqres.in';
    const password = faker.internet.password();
    console.log(email, password);
    const userCreationResponse = await request.post("/api/register", {
      data: {
        "email": email,
        "password": password
      }
    });
    console.log(await userCreationResponse.json());
    expect(userCreationResponse.status()).toBe(200);
    expect(userCreationResponse.statusText()).toBe('OK');
    const logInResponse = await request.post('/api/login', {
      data: {
        "email": email,
        "password": password
      }
    });
    expect(logInResponse.status()).toBe(200);
    expect(logInResponse.statusText()).toBe('OK');
  });
  test.afterAll('Deleting user', async ({ request }) => {
    const deleteUserResponse = await request.delete("/api/users/2");
    expect(deleteUserResponse.status()).toBe(204);
  });

  test('Updating users information', async ({ request }) => {
    const updateUserResponse = await request.put('/api/users/4', {
      data: {
        "name": 'Ryu Sakazaki',
        "job": 'Kyokugenryu Karate martial artist'
      }
    });
    const schemePath = './schemas/updateUserSchema.json';
    const schema = JSON.parse(fs.readFileSync(schemePath, 'utf-8'));
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const isValid = validate(await updateUserResponse.json());
    expect(isValid).toBeTruthy();
    if (!isValid) {
      console.log(JSON.stringify(validate.errors, null, 2));
    }
  });
});
