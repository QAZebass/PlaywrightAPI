import { ApiClass } from "../utils/apiClass";
import { ApiCheckers } from "../utils/apiCheckers";
import { test as baseTest, expect as baseExpect } from "@playwright/test";

export const test = baseTest.extend<{
  apiClass: ApiClass;
  apiCheckers: ApiCheckers;
}>({
  apiClass: async ({ request }, use) => {
    const apiClass = new ApiClass(request);
    await use(apiClass);
  },
  apiCheckers: async ({ apiClass }, use) => {
    const apiCheckers = new ApiCheckers(apiClass);
    await use(apiCheckers);
  }
});

export const expect = baseExpect;
