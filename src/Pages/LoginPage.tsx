import "./LoginPage.css"
import React, { useState } from "react"

interface LoginPageProps {
    handleLogin: (e: React.FormEvent, email: string, name: string) => void
}

const LoginPage = ({ handleLogin }: LoginPageProps) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div id="page">
            <div id="loginContainer">
                <p>Login to Woof Finder</p>
                <form onSubmit={(e) => handleLogin(e, email, name)} className="loginForm">
                    <input type="text" placeholder="Name" name="name" required onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" name="email" required onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )

}

export default LoginPage;