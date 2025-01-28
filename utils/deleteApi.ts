import { APIRequestContext, test } from "@playwright/test";

export class DeleteApi {
  constructor(private request: APIRequestContext) {}

  async deleteUser() {
    const deleteUserResponse = await this.request.delete("/api/users/2");
    return deleteUserResponse.status();
  }
}
