import { useContext } from "react"
import { AuthContext } from "../components/AuthProvider"

export default function UserProfile() {
    const { user } =  useContext(AuthContext)

    return (
        <h1>{user.username}</h1>
    )
}