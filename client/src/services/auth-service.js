export const signup = async (payload) => {
    // fetch(backend_endpoint, request detail[including payload, header, method])
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/signup`, {
        method: "POST",
        // headers is a just meta data of the request
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    // the response contains more than just the payload such as status/messages/response headers
    // parsing a string to json is an expensive operation
    // response.ok to check for good status code
    // or response.status === 200
    // https://www.youtube.com/watch?v=8aGhZQkoFbQ
    const data = await response.json()
    return data.token
}

export const login = async (payload) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    return data.token
}

