const app = require("../../app")
const request = require("supertest")

describe("auth.js", () => {
    it("response correctly when processing /api/v1/auth/signup route", async() => {
        // setup
            const payload = {
                "username": "jessie",
                "password": "password"
            }
        //act/action
            const response = await request(app).post("/api/v1/auth/signup").send(payload)
        //expectation
            console.log(JSON.parse(response.text))
            expect(JSON.parse(response.text)).toContain('token')
            expect(typeof JSON.parse(response.text)).toBe('string')
    })
})