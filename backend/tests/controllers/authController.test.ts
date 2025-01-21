import request from "supertest";
import { app } from "../../src/server";
import { query } from "../../src/db";
import { hashPassword } from "../../src/helpers/auth";
import { QueryResult } from "pg";

// Mock the database and auth helper functions
jest.mock("../../src/db", () => ({
  query: jest.fn(),
}));

jest.mock("../../src/helpers/auth", () => ({
  hashPassword: jest.fn(),
}));

// Create and clean up server properly
let server: any;
beforeAll((done) => {
  server = app.listen(5002, () => {
    done();
  });
});

afterAll((done) => {
  if (server) {
    server.close(done);
  } else {
    done();
  }
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /signup", () => {
  it("should return an error if the email is not provided", async () => {
    const response = await request(app).post("/signup").send({
      password: "password123",
      confirmation: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe("Your email is required");
  });

  it("should return an error if the email is invalid", async () => {
    const response = await request(app).post("/signup").send({
      mail: "invalidemail",
      password: "password123",
      confirmation: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe("Your email is not valid");
  });

  it("should return an error if the password is less than 8 characters", async () => {
    const response = await request(app).post("/signup").send({
      mail: "user@example.com",
      password: "short",
      confirmation: "short",
    });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(
      "Your password should have at least 8 characters"
    );
  });

  it("should return an error if passwords don't match", async () => {
    const response = await request(app).post("/signup").send({
      mail: "user@example.com",
      password: "password123",
      confirmation: "differentpassword123",
    });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(
      "Your password confirmation does not match your password."
    );
  });

  it("should return an error if the email is already used", async () => {
    (query as jest.MockedFunction<typeof query>).mockResolvedValueOnce({
      rows: [{ id: 1, mail: "user@example.com" }],
      command: "SELECT",
      rowCount: 1,
      oid: 0,
      fields: [],
    });

    const response = await request(app).post("/signup").send({
      mail: "user@example.com",
      password: "password123",
      confirmation: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe("This mail is already used");
  });

  it("should create a new user and return the user data if signup is successful", async () => {
    (query as jest.MockedFunction<typeof query>)
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

    (hashPassword as jest.Mock).mockResolvedValue("hashedPassword123");

    const response = await request(app).post("/signup").send({
      mail: "user@example.com",
      password: "password123",
      confirmation: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.mail).toBe("user@example.com");
  });
});
