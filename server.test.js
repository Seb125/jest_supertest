const request = require("supertest");
const makeApp = require("./app");

const createUser = jest.fn(); // mock function with jest

const app = makeApp({
  createUser,
});

beforeAll(async () => {});

afterAll(async () => {});

describe("GET /", () => {
  test("should return index.html", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.header["content-type"]).toBe("text/html; charset=UTF-8");
  });
});

describe("POST /", () => {

  beforeEach(() => {
    createUser.mockReset()
  })

  test("should save the username and password to the database", async () => {
    const bodyData = [
      { name: "username1", email: "email1", password: "password1" },
      { name: "username2", email: "email2", password: "password2" },
      { name: "username3", email: "email3", password: "password3" },
    ];

    for (const body in bodyData) {
      createUser.mockReset();   // Resets the mock function for every loop iteration, otherwise for example function calls will be memorized each iteration
      await request(app).post("/addUser").send(body);
      expect(createUser.mock.calls.length).toBe(1); // make sure that create USer is only called once
      expect(createUser.mock.calls[0][0]).toBe(body.name);
      expect(createUser.mock.calls[0][1]).toBe(body.email);
      expect(createUser.mock.calls[0][2]).toBe(body.password);
    }
  })

  test("should respond with a json object containing the user id", async () => {
    for (let i = 0; i < 10; i++) {
      createUser.mockReset()
      createUser.mockResolvedValue(i)
      const response = await request(app).post("/addUser").send({name: "name", email: "email", password: "password"})
      expect(response.body.userId).toBe(i)
    }
  })

});
