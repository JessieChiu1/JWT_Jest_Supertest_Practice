// jest - unit testing - framework not lib
// every single function, you want to test it 
// protect against regression - when you update existing code, you might break other functionality you have

// supertest - tool for end to end testing
// testing all of the function that goes into a request - similar to postman but you can write code to automate the request
// supertest good for testing your route if you are using other API
const request = require("supertest")
const app = require("../app")

// describe(file you are testing, function that contain the test suite)
describe("app.js", () => {
    it("response correctly when processing the home route", async() => {
        // 1. setup 

        // 2. act/action
        const response = await request(app).get("/")
        // 3. expectation
        expect(response.text).toBe("okay")
    })
})