"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
const db_1 = require("../../src/db");
const auth_1 = require("../../src/helpers/auth");
// Mock the database and auth helper functions
jest.mock("../../src/db", () => ({
    query: jest.fn(),
}));
jest.mock("../../src/helpers/auth", () => ({
    hashPassword: jest.fn(),
}));
// Create and clean up server properly
let server;
beforeAll((done) => {
    server = server_1.app.listen(5002, () => {
        done();
    });
});
afterAll((done) => {
    if (server) {
        server.close(done);
    }
    else {
        done();
    }
});
// Clear all mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});
describe("POST /signup", () => {
    it("should return an error if the email is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/signup").send({
            password: "password123",
            confirmation: "password123",
        });
        expect(response.status).toBe(200);
        expect(response.body.error).toBe("Your email is required");
    }));
    it("should return an error if the email is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/signup").send({
            mail: "invalidemail",
            password: "password123",
            confirmation: "password123",
        });
        expect(response.status).toBe(200);
        expect(response.body.error).toBe("Your email is not valid");
    }));
    it("should return an error if the password is less than 8 characters", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/signup").send({
            mail: "user@example.com",
            password: "short",
            confirmation: "short",
        });
        expect(response.status).toBe(200);
        expect(response.body.error).toBe("Your password should have at least 8 characters");
    }));
    it("should return an error if passwords don't match", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post("/signup").send({
            mail: "user@example.com",
            password: "password123",
            confirmation: "differentpassword123",
        });
        expect(response.status).toBe(200);
        expect(response.body.error).toBe("Your password confirmation does not match your password.");
    }));
    it("should return an error if the email is already used", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.query.mockResolvedValueOnce({
            rows: [{ id: 1, mail: "user@example.com" }],
            command: "SELECT",
            rowCount: 1,
            oid: 0,
            fields: [],
        });
        const response = yield (0, supertest_1.default)(server_1.app).post("/signup").send({
            mail: "user@example.com",
            password: "password123",
            confirmation: "password123",
        });
        expect(response.status).toBe(200);
        expect(response.body.error).toBe("This mail is already used");
    }));
    it("should create a new user and return the user data if signup is successful", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.query
            .mockResolvedValueOnce({
            rows: [],
            command: "SELECT",
            rowCount: 0,
            oid: 0,
            fields: [],
        })
            .mockResolvedValueOnce({
            rows: [{ id: 1, mail: "user@example.com" }],
            command: "INSERT",
            rowCount: 1,
            oid: 0,
            fields: [],
        });
        auth_1.hashPassword.mockResolvedValue("hashedPassword123");
        const response = yield (0, supertest_1.default)(server_1.app).post("/signup").send({
            mail: "user@example.com",
            password: "password123",
            confirmation: "password123",
        });
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.mail).toBe("user@example.com");
    }));
});
//# sourceMappingURL=authController.test.js.map