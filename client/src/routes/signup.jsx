// the routes and components function name needs to be Uppercase for react to detect it
import React, { useState, useContext } from 'react'
import { signup } from "../services/auth-service"
import { AuthContext } from '../components/AuthProvider'


export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")

    // the signup page only need the abilities to setToken
    const { setToken } = useContext(AuthContext);

    const handleChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangePassword1 = (e) => {
        setPassword1(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(password === password1 && username) {
            const payload = {
                username,
                password,
            }
            console.log(payload)
            const token = await signup(payload)
            setToken(token)
            window.location.href = "/user"
        } else {
            alert("password does not match or missing username")
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
                    type="password" 
                    name="password1"
                    placeholder="Re-type Password"
                    value={password1}
                    onChange={handleChangePassword1}
                />
                <input 
                    type="submit"
                    value="Signup"
                />
            </form>
        </>
    )
}