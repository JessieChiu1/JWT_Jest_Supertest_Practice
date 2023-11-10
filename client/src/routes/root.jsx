import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export default function Root() {
  const { user, setToken } = useContext(AuthContext)

  const handleClickLogout = () => {
    setToken(undefined)
  }

  return (
    <div>
      <h1>HomePage</h1>
      {!user && <>
        <a href="/signup">Signup</a>
        <a href="/login">Login</a>
      </>}

      {user && <>
        <button onClick={handleClickLogout}>Logout</button>
      </>}
    </div>
  );
}