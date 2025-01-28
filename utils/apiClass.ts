import { APIRequestContext } from "@playwright/test";

export class ApiClass {
  constructor(private request: APIRequestContext) { }

  async createUserApi(email: string, password: string) {
    const createUserResponse = await this.request.post("/api/register", {
      data: {
        email: email,
        password: password,
      },
    });
    return createUserResponse;
  }

  async logInApi(email: string, password: string) {
    const logInResponse = await this.request.post("/api/login", {
      data: {
        email: email,
        password: password,
      },
    });
    return logInResponse;
  }
  async deleteUser() {
    const deleteUserResponse = await this.request.delete("/api/users/2");
    return deleteUserResponse;
  }

  async updateUser(name: string, job: string) {
    const updateUserResponse = await this.request.put("/api/users/2", {
      data: {
        name: name,
        job: job,
      },
    });
    return updateUserResponse;
  }
  async getUserInfo() {
    const getUserInfoResponse = await this.request.get('/api/users/2');
    return getUserInfoResponse;
  }
}
