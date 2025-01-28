import { APIRequestContext } from "@playwright/test";

export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async createUserApi(email: string, password: string) {
    const createUserResponse = await this.request.post("/api/register", {
      data: {
        email: email,
        password: password,
      },
    });
    return await createUserResponse.json();
  }

  async logInApi(email: string, password: string) {
    const logInResponse = await this.request.post("/api/login", {
      data: {
        email: email,
        password: password,
      },
    });
    return await logInResponse.json();
  }
}
