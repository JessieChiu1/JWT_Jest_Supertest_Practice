import React, { useState, useContext } from "react"
import { login } from "../services/auth-service"
import { AuthContext } from '../components/AuthProvider'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { setToken } = useContext(AuthContext);

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(username && password) {
            const payload = {
                username,
                password,
            }
            console.log(payload)
            const token = await login(payload)
            setToken(token)
            window.location.href = "/user"
        } else {
            alert("Incorrect Username or Password")
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleChangeUsername}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                />
                <input 
                    type="submit"
                    value="Signup"
                />
            </form>
        </>
    )
}