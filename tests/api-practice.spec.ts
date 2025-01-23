import { test, expect } from "@playwright/test";

test("Practising API testing in Playwright", async ({ request }) => {
  const response = await request.get("/api/users?page=1");
  console.log(await response.json());
  expect(response.status()).toBe(200);
  expect(response.statusText()).toBe("OK");
});
