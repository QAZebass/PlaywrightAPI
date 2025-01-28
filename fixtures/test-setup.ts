import { AuthApi } from "../utils/authApi";
import { DeleteApi } from "../utils/deleteApi";
import { test as baseTest, expect as baseExpect } from "@playwright/test";

export const test = baseTest.extend<{
  authApi: AuthApi;
  deleteApi: DeleteApi;
}>({
  authApi: async ({ request }, use) => {
    const authApi = new AuthApi(request);
    await use(authApi);
  },
  deleteApi: async ({ request }, use) => {
    const deleteApi = new DeleteApi(request);
    await use(deleteApi);
  },
});

export const expect = baseExpect;
