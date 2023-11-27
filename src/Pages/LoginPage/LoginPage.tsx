import "./LoginPage.css"
import React, { useState } from "react"
import PixelBullTerrier from "../../assets/bullTerrier.png"

interface LoginPageProps {
    handleLogin: (e: React.FormEvent, email: string, name: string) => void
}

const LoginPage = ({ handleLogin }: LoginPageProps) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div id="page">
            <div id="loginContainer">
                <h2>Login to Woof Finder</h2>
                <div>
                    <img src={PixelBullTerrier} alt="Pixel art of a Bull Terrier" width={57} height={57} />
                </div>
                <form onSubmit={(e) => handleLogin(e, email, name)} className="loginForm">
                    <input type="text" placeholder="Name" name="name" required onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" name="email" required onChange={(e) => setEmail(e.target.value)} />
                    <button className="primaryButton" type="submit">Login</button>
                </form>
            </div>
        </div>
    )

}

export default LoginPage;