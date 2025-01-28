import { expect } from '@playwright/test';
import { ApiClass } from "./apiClass";
import Ajv, { JSONSchemaType } from "ajv";
import * as fs from "fs";

export class ApiCheckers {
    private apiClass: ApiClass;

    constructor(apiClass: ApiClass) {
        this.apiClass = apiClass;
    }

    async validateUpdateUserResponse(name: string, job: string) {
        const updateUserResponse = await this.apiClass.updateUser(name, job);
        const responseJSON = await updateUserResponse.json();
        console.log(responseJSON);
    }

    async checkCorrectSchema(schemePath: string, JSONResponse: object) {
        const path = schemePath;
        const schema = JSON.parse(fs.readFileSync(path, "utf-8"));
        const ajv = new Ajv({ allErrors: true, strict: false });
        const validate = ajv.compile(schema);
        const isValid = validate(JSONResponse);
        expect(isValid).toBeTruthy();
    }
}